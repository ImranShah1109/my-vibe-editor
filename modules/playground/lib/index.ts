import { TemplateFile, TemplateFolder } from "./path-to-json";

export function findFilePath(
  file: TemplateFile,
  folder: TemplateFolder,
  pathSoFar: string[] = []
): string | null {
  for (const item of folder.items) {
    if ("folderName" in item) {
      const res = findFilePath(file, item, [...pathSoFar, item.folderName]);
      if (res) return res;
    } else {
      if (
        item.filename === file.filename &&
        item.fileExtension === file.fileExtension
      ) {
        return [
          ...pathSoFar,
          item.filename + (item.fileExtension ? "." + item.fileExtension : ""),
        ].join("/");
      }
    }
  }
  return null;
}

export const generateFileId = (
  file: TemplateFile,
  rootFolder: TemplateFolder
) => {
  // find the file's path in the folder structure
  const path = findFilePath(file, rootFolder)?.replace(/^\/+/, "") || "";

  // handle empty/undfined file extensions
  const extension = file.fileExtension.trim();
  const extensionSuffix = extension ? `.${extension}` : "";

  // combine path and filename
  return path
    ? `${path}/${file.filename}${extensionSuffix}`
    : `${file.filename}${extensionSuffix}`;
};
