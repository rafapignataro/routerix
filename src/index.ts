import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

import { copyDir, saveFile } from './utils';
import { Config, Schema } from './types';

import { loadConfig } from './core/load-config';
import { parseRoute } from './core/parse-route';

export const PATHS_CONFIG = (() => {
  const LIBRARY_PATH = path.resolve(process.cwd(), 'node_modules', 'atlas.js');
  const LIBRARY_VITE_PATH = path.resolve(LIBRARY_PATH, 'src', 'app');
  const LIBRARY_VITE_BUILD_PATH = path.resolve(LIBRARY_PATH, 'build');
  const APP_PATH = process.cwd();
  const APP_GENERATION_PATH = path.resolve(APP_PATH, '.atlas');
  const APP_GENERATION_BUILD_PATH = path.resolve(APP_PATH, '.atlas', 'build');

  return {
    LIBRARY_PATH,
    LIBRARY_VITE_PATH,
    LIBRARY_VITE_BUILD_PATH,
    APP_PATH,
    APP_GENERATION_PATH,
    APP_GENERATION_BUILD_PATH,
  } as const;
})();

function prepareConfig(config: Config) {
  try {
    const rootStats = fs.statSync(config.rootPath);

    if (!rootStats.isDirectory()) throw 'Root must be a directory';

    const resolvedRootPath = path.resolve(config.rootPath).replace(process.cwd(), '');

    return { rootPath: resolvedRootPath }
  } catch (err: any) {
    throw new Error(`PREPARE_CONFIG: ${err.message}`)
  }
}

function createDefaultConfig() {
  // TODO: Make this type work in final file
  const content = `
/** @type {import('atlas.js').Config}') */
module.exports = {
  rootPath: './src/app'
}
  `.trim();

  fs.writeFile('atlas.config.js', content, (err) => {
    if (err) return console.error('Error writing file:', err);

    console.log('✅ Config file (atlas.config.js) created successfully.');
  });
}

export async function init() {
  // TODO: Check if config already exists
  createDefaultConfig();
}

export async function generate() {
  const config = await loadConfig(path.join(process.cwd(), 'atlas.config.js'));

  const preparedConfig = prepareConfig(config);

  const parsedRoute = parseRoute(preparedConfig, preparedConfig.rootPath);

  if (!parsedRoute) throw new Error('❌ Root directory is empty');

  const schema: Schema = {
    id: crypto.randomUUID(),
    createdAt: new Date().getTime(),
    graph: parsedRoute.route,
    list: parsedRoute.list,
  }

  saveFile({
    fileName: 'schema.json',
    destination: PATHS_CONFIG.LIBRARY_VITE_PATH,
    content: JSON.stringify(schema, null, 2)
  });

  exec('pnpm vite build', { cwd: PATHS_CONFIG.LIBRARY_PATH }, (error) => {
    if (error) {
      console.error(`Error during build: ${error}`);
      return;
    }

    if (fs.existsSync(PATHS_CONFIG.APP_GENERATION_PATH)) {
      fs.rmSync(PATHS_CONFIG.APP_GENERATION_PATH, { recursive: true, force: true });
    }

    fs.mkdirSync(PATHS_CONFIG.APP_GENERATION_PATH);
    fs.mkdirSync(PATHS_CONFIG.APP_GENERATION_BUILD_PATH);

    copyDir(PATHS_CONFIG.LIBRARY_VITE_BUILD_PATH, PATHS_CONFIG.APP_GENERATION_BUILD_PATH);

    console.log('✅ UI build files (.atlas) created successfully!');
  });
}

export async function preview() {
  console.warn('👷 Previes is not implemented yet :( 👷')

  return;

  exec('pnpm vite dev', { cwd: path.resolve(__dirname, '../') }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error during dev: ${error}`);
      return;
    }
    console.log(`Dev output: ${stdout}`);
    console.error(`Dev errors: ${stderr}`);
  });
}