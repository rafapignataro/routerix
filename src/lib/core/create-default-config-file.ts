import fs from 'fs';
import { CONFIG_PATHS } from './get-config-paths';
import { saveFile } from '../utils';

export async function createDefaultConfigFile() {
  const content = `
/** @type {import('routerix').Config}') */
module.exports = {
  provider: 'nextjs-app',
  rootPath: './src/app'
}
  `.trim();

  if (fs.existsSync(CONFIG_PATHS.APP_CONFIG_PATH)) {
    fs.rmSync(CONFIG_PATHS.APP_CONFIG_PATH, { recursive: true, force: true });
  }

  saveFile({
    fileName: 'routerix.config.js',
    destination: CONFIG_PATHS.USER_PATH,
    content
  });

  console.info('✅ Config file (routerix.config.js) created successfully.');
}