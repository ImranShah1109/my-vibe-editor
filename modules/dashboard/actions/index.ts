"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/modules/auth/actions";
import { revalidatePath } from "next/cache";
import path from "path";
import * as fs from "fs/promises";
import * as fss from "fs";
import { scanTemplateDirectory } from "@/modules/playground/lib/path-to-json";
import { detectTemplate } from "../lib/detect-template";
import AdmZip from "adm-zip";

export const getAllPlaygroundForUser = async () => {
  const user = await currentUser();

  try {
    const playground = await db.playground.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        user: true,
        Starmark: {
          where: {
            userId: user?.id,
          },
          select: {
            isMarked: true,
          },
        },
      },
    });

    return playground;
  } catch (error) {
    console.log("Error in getAllPlaygroundForUser: ", error);
  }
};

export const createPlayground = async (data: {
  title: string;
  template: "REACT" | "NEXTJS" | "EXPRESS" | "HONO" | "ANGULAR" | "VUE";
  description?: string;
}) => {
  const user = await currentUser();

  const { title, template, description } = data;

  try {
    const playground = await db.playground.create({
      data: {
        title: title,
        template: template,
        description: description,
        userId: user?.id!,
      },
    });

    return playground;
  } catch (error) {
    console.log("Error in createPlayground: ", error);
  }
};

export const deleteProjectById = async (id: string) => {
  try {
    await db.playground.delete({
      where: { id },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log("Error in deleteProjectById: ", error);
  }
};

export const editProjectById = async (
  id: string,
  data: {
    title: string;
    description?: string;
  }
) => {
  try {
    await db.playground.update({
      where: { id },
      data: data,
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.log("Error in editProjectById: ", error);
  }
};

export const duplicateProjectById = async (id: string) => {
  try {
    const project = await db.playground.findUnique({
      where: { id },
      // todo: add template files
    });
    if (!project) {
      throw new Error("Original playground not found");
    }

    const duplicatedPlayground = await db.playground.create({
      data: {
        title: `${project.title} (Copy)`,
        description: project.description,
        template: project.template,
        userId: project.userId,

        // todo: add template files
      },
    });
    revalidatePath("/dashboard");
    return duplicatedPlayground;
  } catch (error) {
    console.log("Error in duplicateProjectById: ", error);
  }
};

export const toggleStarMarked = async (id: string) => {
  try {
    const user = await currentUser();
    let isMarked = false;
    if (!user?.id) {
      throw new Error("User Id is required");
    }
    // Check if a Starmark entry already exists for the given playgroundId
    const existingStarmark = await db.starmark.findUnique({
      where: { userId_playgroundId: { userId: user?.id!, playgroundId: id } },
    });

    if (existingStarmark) {
      // If it exists, delete it
      await db.starmark.delete({
        where: {
          userId_playgroundId: {
            userId: user?.id!,
            playgroundId: id,
          },
        },
      });
    } else {
      // If it doesn't exist, create a new Starmark entry
      await db.starmark.create({
        data: {
          playgroundId: id,
          isMarked: true,
          userId: user?.id!,
        },
      });
      isMarked = true;
    }

    revalidatePath("/dashboard");
    return { success: true, isMarked: isMarked };
  } catch (error) {
    console.log("Error in markProjectAsFavoriteById: ", error);
    return { success: false, error: "Failed to update problem" };
  }
};

// github repo import action

export const importGithubRepo = async (repoUrl: string) => {
  const user = await currentUser();

  // Extract owner and repo name from the URL
  const match = repoUrl.match(
    /https:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\.git)?/
  );
  if (!match) {
    throw new Error("Invalid GitHub repository URL");
  }
  const owner = match[1];
  let repo = match[2];
  if (repo.endsWith(".git")) {
    repo = repo.slice(0, -4); // remove last 4 characters
  }
  // console.log("owner ", owner);
  // console.log("repo ", repo);

  // download gitrepo as zip
  const zipURL = `https://codeload.github.com/${owner}/${repo}/zip/refs/heads/main`;

  const downloadDir = path.join(process.cwd(), "temp", `${repo}-${Date.now()}`);
  await fs.mkdir(downloadDir, { recursive: true });

  const zipFile = path.join(downloadDir, "repo.zip");

  try {
    // fetch ZIP file
    const res = await fetch(zipURL);
    console.log("zip url fetch response ", res);
    if (!res.ok) {
      throw new Error("Failed to download repository");
    }

    const buffer = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(zipFile, buffer);

    // unzip the file
    // console.log("🔓 Extracting ZIP...");
    const zip = new AdmZip(zipFile);
    zip.extractAllTo(downloadDir, true);
    // console.log("✅ ZIP extracted to:", downloadDir);

    // the extracted folder will be named as repo-main
    const extractedFolder = path.join(downloadDir, `${repo}-main`);

    const templateType = await detectTemplate(extractedFolder);
    // convert folder to json template
    const templateJson = await scanTemplateDirectory(extractedFolder);

    // create new playground entry
    const playground = await db.playground.create({
      data: {
        title: repo,
        description: `Imported from github repo ${repoUrl}`,
        template: templateType,
        userId: user?.id!,
        templateFiles: {
          create: {
            content: JSON.stringify(templateJson),
          },
        },
      },
      include: {
        templateFiles: true,
      },
    });
    // console.log("playground entry created successfully");
    await fs.rm(downloadDir, { recursive: true, force: true });
    return { success: true, data: playground };
  } catch (error) {
    console.log("Error in importGithubRepo: ", error);
    return { success: false, error: (error as Error).message };
  } finally {
    // Clean up temporary files
    if (fss.existsSync(downloadDir)) {
      await fs.rm(downloadDir, { recursive: true, force: true });
    }
  }
};
