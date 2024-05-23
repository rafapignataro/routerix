import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

import { Config } from '../types';
import { copyDir, saveFile } from './utils';

const LIBRARY_PATH = path.resolve(process.cwd(), 'node_modules', 'node-routes');
const LIBRARY_VITE_PATH = path.resolve(LIBRARY_PATH, 'src', 'app');
const LIBRARY_VITE_BUILD_PATH = path.resolve(LIBRARY_PATH, 'build');
const APP_PATH = process.cwd();
const APP_GENERATION_PATH = path.resolve(APP_PATH, '.next-routes');
const APP_GENERATION_BUILD_PATH = path.resolve(APP_PATH, '.next-routes', 'build');

function getEntryFolderType(entryName: string) {
  if (entryName[0] === "(" && entryName.at(-1) === ")") {
    return { type: "route", subType: "container", icon: 'container' };
  }

  if (entryName[0] === "[" && entryName.at(-1) === "]") {
    return { type: "route", subType: "dynamic", param: entryName.slice(1, entryName.length - 1), icon: 'file' };
  }

  return { type: "route", subType: "default", icon: 'file' };
}

function getEntryFileType(entryName: string) {
  switch (entryName) {
    case "page.tsx":
    case "page.js":
      return { type: "component", subType: "page", icon: 'file' };
    case "layout.tsx":
    case "layout.js":
      return { type: "component", subType: "layout", icon: 'layout' };
    case "not-found.tsx":
    case "not-found.js":
      return { type: "component", subType: "not-found", icon: 'file' };
    default:
      return { type: "unknown", icon: 'file' };
  }
}

function generateSchema(config: Config, entryPath: string) {
  const entryStats = fs.statSync(entryPath);

  const entryName = path.basename(entryPath);

  const resolvedRootPath = path.resolve(config.rootPath);
  const resolvedEntryPath = path.resolve(entryPath);

  const entryRoutePath = resolvedEntryPath.replace(resolvedRootPath, '');

  let schema: Record<string, any> = {
    name: entryName,
    route: entryRoutePath
  };

  if (entryStats.isDirectory()) {
    const entryFiles = fs.readdirSync(entryPath, { withFileTypes: true });

    const isRoot = entryRoutePath === "" && entryName === "app";

    if (isRoot) {
      schema.type = 'root';
      schema.icon = 'root';
    } else {
      schema = { ...schema, ...getEntryFolderType(entryName) };
    }

    schema.children = {};

    for (const entryFile of entryFiles) {
      schema.children[entryFile.name] = generateSchema(
        config,
        path.resolve(entryPath, entryFile.name)
      )
    }

    return schema;
  }

  schema = { ...schema, ...getEntryFileType(entryName) }

  return schema;
}

async function loadConfig(configFile: string) {
  try {
    const module = await import(configFile);

    if (!module.default) throw new Error('Missing default export in config file');

    const config = module.default as Config;

    return { config, error: null } as { config: Config, error: null }
  } catch (error: any) {
    return { config: null, error: error.message } as { config: null, error: string }
  }
}

function createDiagramSchema(config: Config) {
  const start = new Date().getTime();

  const schema = generateSchema(config, config.rootPath);

  const end = new Date().getTime();

  const generation = {
    createdAt: new Date(),
    generationTime: end - start,
    schema,
  }

  saveFile({
    fileName: 'routes.json',
    destination: LIBRARY_VITE_PATH,
    content: JSON.stringify(generation, null, 2)
  });
}

function createDefaultConfig() {
  // TODO: Make this type work in final file
  const content = `
/** @type {import('node-routes').Config}') */
module.exports = {
  rootPath: './src/app'
}
  `.trim();

  fs.writeFile('node-routes.config.js', content, (err) => {
    if (err) return console.error('Error writing file:', err);

    console.log('File has been written successfully.');
  });
}

export async function init() {
  // TODO: Check if config already exists
  createDefaultConfig();
}

export async function generate() {
  const { config, error } = await loadConfig(path.join(process.cwd(), 'node-routes.config.js'));

  if (error || !config) return console.error(error);

  createDiagramSchema(config);

  exec('pnpm vite build', { cwd: LIBRARY_PATH }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during build: ${error}`);
      return;
    }

    if (fs.existsSync(APP_GENERATION_PATH)) {
      fs.rmSync(APP_GENERATION_PATH, { recursive: true, force: true });
    }

    fs.mkdirSync(APP_GENERATION_PATH);
    fs.mkdirSync(APP_GENERATION_BUILD_PATH);

    copyDir(LIBRARY_VITE_BUILD_PATH, APP_GENERATION_BUILD_PATH);
  });
}

export async function preview() {
  const { config, error } = await loadConfig(path.join(process.cwd(), 'node-routes.config.js'));

  if (error || !config) return console.error(error);

  createDiagramSchema(config);

  exec('pnpm vite dev', { cwd: path.resolve(__dirname, '../') }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during dev: ${error}`);
      return;
    }
    console.log(`Dev output: ${stdout}`);
    console.error(`Dev errors: ${stderr}`);
  });
}