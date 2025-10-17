"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/modules/auth/actions";
import { revalidatePath } from "next/cache";

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
