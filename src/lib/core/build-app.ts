import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { build } from 'vite';

import { CONFIG_PATHS } from './get-config-paths';
import { copyDir } from '../utils';
import react from '@vitejs/plugin-react';

export async function buildApp() {
  await build({
    configFile: CONFIG_PATHS.LIBRARY_VITE_CONFIG_PATH
  })

  // exec('pnpm vite build', { cwd: CONFIG_PATHS.LIBRARY_PATH }, (error) => {
  //   if (error) {
  //     console.error(`Error during build: ${error}`);
  //     return;
  //   }

  //   if (fs.existsSync(CONFIG_PATHS.APP_GENERATION_PATH)) {
  //     fs.rmSync(CONFIG_PATHS.APP_GENERATION_PATH, { recursive: true, force: true });
  //   }

  //   fs.mkdirSync(CONFIG_PATHS.APP_GENERATION_PATH);
  //   fs.mkdirSync(CONFIG_PATHS.APP_GENERATION_BUILD_PATH);

  //   copyDir(CONFIG_PATHS.LIBRARY_VITE_BUILD_PATH, CONFIG_PATHS.APP_GENERATION_BUILD_PATH);

  //   console.info('✅ UI build files (.routerix) created successfully!');
  // });
}