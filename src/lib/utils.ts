import fs from 'fs';
import path from 'path';
import { CONFIG_PATHS } from './core/get-config-paths';

interface SaveFileProps {
  fileName: string;
  destination: string;
  content: string;
}

export function saveFile({ fileName, destination, content }: SaveFileProps) {
  const dest = path.join(destination, fileName);

  fs.writeFile(dest, content, (err) => {
    if (err) return console.error('Error writing file:', err);

    return true;
  });
}

export function copyDir(from: string, destination: string) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const entries = fs.readdirSync(from, { withFileTypes: true });

  for (const entry of entries) {
    const fromPath = path.join(from, entry.name);
    const destinationPath = path.join(destination, entry.name);

    if (entry.isDirectory()) {
      copyDir(fromPath, destinationPath);
    } else {
      fs.copyFileSync(fromPath, destinationPath);
    }
  }
}

export function getPathStats(path: string) {
  try {
    return fs.statSync(path);
  } catch (err) {
    return null;
  }
}

export function getDirectoryFiles(path: string) {
  return fs.readdirSync(path, { withFileTypes: true });
}

type PathInfo = {
  type: 'file' | 'folder';
  name: string;
  absolutePath: string;
  relativePath: string
} & (
    | { type: 'file'; }
    | { type: 'folder'; isEmpty: boolean; children: Record<string, PathInfo> }
  )

export function getPathInfo(params: { path: string }, level = 0) {
  const pathStats = getPathStats(params.path);

  if (!pathStats) {
    return null;
  }

  if (!pathStats.isDirectory()) {
    const fileInfo: PathInfo = {
      type: 'file',
      name: path.basename(params.path),
      absolutePath: path.resolve(params.path),
      relativePath: path.relative(CONFIG_PATHS.USER_PATH, params.path)
    }

    return fileInfo;
  }

  const folderInfo: PathInfo = {
    type: 'folder',
    name: path.basename(params.path),
    absolutePath: path.resolve(params.path),
    relativePath: path.relative(CONFIG_PATHS.USER_PATH, params.path),
    isEmpty: true,
    children: {}
  }

  const directoryFiles = getDirectoryFiles(params.path);

  folderInfo.isEmpty = !directoryFiles.length;

  for (const file of directoryFiles) {
    const filePath = path.join(params.path, file.name);

    const pathInfo = getPathInfo({ path: filePath }, level + 1);

    if (!pathInfo) continue;

    folderInfo.children[pathInfo.name] = pathInfo;
  }

  return folderInfo;
}