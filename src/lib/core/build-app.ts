import { build } from 'vite';
import path from 'path';

export async function buildApp() {
  await build({
    configFile: path.resolve(__dirname, '..', 'app', 'vite.config.ts'),
  });

  console.info('✅ UI build files (.routerix) created successfully!\n');
}