
import { buildApp } from './core/build-app';
import { createDefaultConfigFile } from './core/create-default-config-file';
import { createSchema } from './core/create-schema';
import { CONFIG_PATHS } from './core/get-config-paths';
import { loadConfigFile } from './core/load-config-file';
import { RawConfig } from './core/types';
import { validateConfig } from './core/validate-config';

function tempRemoveViteLog() {
  process.stdout.moveCursor(0, -2);
  process.stdout.clearLine(1);
}

export async function init() {
  tempRemoveViteLog();

  createDefaultConfigFile();
}

export async function generate(params?: RawConfig) {
  tempRemoveViteLog();

  if (params) {
    console.info('\n ⚙️ Args passed via CLI, ignoring config file to create schema... \n');
  } else {
    console.info('\n ⚙️ No args passed to CLI, using config file to create schema... \n');
  }

  const config = params || await loadConfigFile(CONFIG_PATHS.USER_CONFIG_PATH);

  if (!config) {
    console.error('\n ❌ Failed to config Routerix. Provide args via CLI or use the Routerix config file. \n')

    return;
  }

  const configValidation = await validateConfig(config);

  if (!configValidation.success) {
    console.error(`\n ❌ ${configValidation.error} \n`)

    return;
  }

  await createSchema(configValidation.data!);

  await buildApp();
}

export async function preview() {
  tempRemoveViteLog();

  console.warn('👷 Preview is not implemented yet. Run a development server of Routerix app! 👷')

  return;
}