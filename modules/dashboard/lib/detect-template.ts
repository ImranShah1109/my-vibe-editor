import * as fs from "fs/promises";
import path from "path";

export type TemplateTypes =
  | "NEXTJS"
  | "REACT"
  | "VUE"
  | "ANGULAR"
  | "EXPRESS"
  | "HONO";

export async function detectTemplate(rootPath: string): Promise<TemplateTypes> {
  const packageJsonPath = path.join(rootPath, "package.json");
  let pkg: any = null;

  try {
    const raw = await fs.readFile(packageJsonPath, "utf-8");
    pkg = JSON.parse(raw);
  } catch {
    // if no package.json — fallback later
  }

  const deps = {
    ...pkg?.dependencies,
    ...pkg?.devDependencies,
  };

  // ---------------------------------------
  // 1. NEXT.JS
  // ---------------------------------------
  if (
    deps?.next ||
    (await exists(path.join(rootPath, "pages"))) ||
    (await exists(path.join(rootPath, "app")))
  ) {
    return "NEXTJS";
  }

  // ---------------------------------------
  // 2. REACT (CRA or Vite React)
  // ---------------------------------------
  if (deps?.react && !deps?.vite) return "REACT";

  if (
    deps?.vite &&
    (deps["@vitejs/plugin-react"] || deps["@vitejs/plugin-react-swc"])
  ) {
    return "REACT";
  }

  // ---------------------------------------
  // 3. VUE
  // ---------------------------------------
  if (deps?.vue || deps?.["@vue/compiler-sfc"]) {
    return "VUE";
  }

  // ---------------------------------------
  // 4. ANGULAR
  // ---------------------------------------
  if (
    deps?.["@angular/core"] ||
    (await exists(path.join(rootPath, "angular.json")))
  ) {
    return "ANGULAR";
  }

  // ---------------------------------------
  // 5. EXPRESS
  // ---------------------------------------
  if (deps?.express) {
    return "EXPRESS";
  }

  // ---------------------------------------
  // 6. HONO
  // ---------------------------------------
  if (deps?.hono) {
    return "HONO";
  }

  // Default fallback
  return "REACT";
}

// Utility: Check if file/folder exists
async function exists(p: string) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}
