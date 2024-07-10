
import { buildApp } from './core/build-app';
import { createDefaultConfigFile } from './core/create-default-config-file';
import { createSchema } from './core/create-schema';
import { CONFIG_PATHS } from './core/get-config-paths';
import { loadConfigFile } from './core/load-config-file';
import { Config } from './core/types';
import { providers } from './providers';

export async function init() {
  createDefaultConfigFile();
}

export async function generate(params?: Config) {
  const config = params || await loadConfigFile(CONFIG_PATHS.APP_CONFIG_PATH);

  if (!config) {
    console.error('\n ❌ Failed to config Routerix. Provide args via CLI or use the Routerix config file. \n')

    return;
  }

  if (!providers[config.provider]) {
    console.error('\n ❌ Provider not found. Please check README for current supported providers. \n');

    return;
  }

  await createSchema(config);

  await buildApp();
}

export async function preview() {
  console.warn('👷 Preview is not implemented yet. Run a development server of Routerix app! 👷')

  return;
}