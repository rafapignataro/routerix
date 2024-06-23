import path from 'path';
import { exec } from 'child_process';

import { createDefaultConfigFile } from './core/create-default-config-file';
import { createSchema } from './core/create-schema';
import { buildApp } from './core/build-app';

export async function init() {
  createDefaultConfigFile();
}

export async function generate() {
  await createSchema('nextjs-app');

  await buildApp();
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