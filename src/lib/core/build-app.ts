import { build } from 'vite';
import path from 'path';

import { CONFIG_PATHS } from './get-config-paths';

export async function buildApp() {
  await build({
    configFile: path.resolve(__dirname, '..', 'app', 'vite.config.ts'),
  });

  console.info('✅ UI build files (.routerix) created successfully!\n');

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