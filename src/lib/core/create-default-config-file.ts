import fs from 'fs';
import { CONFIG_PATHS } from './get-config-paths';
import { saveFile } from '../utils';

export async function createDefaultConfigFile() {
  // TODO: Make this type work in final file
  const content = `
/** @type {import('routerix').Config}') */
module.exports = {
  rootPath: './src/app'
}
  `.trim();

  if (fs.existsSync(CONFIG_PATHS.APP_CONFIG_PATH)) {
    fs.rmSync(CONFIG_PATHS.APP_CONFIG_PATH, { recursive: true, force: true });
  }

  saveFile({
    fileName: 'routerix.config.js',
    destination: CONFIG_PATHS.APP_PATH,
    content
  });

  console.log('✅ Config file (routerix.config.js) created successfully.');
}