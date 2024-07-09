import path from 'path';
import { exec } from 'child_process';

import { createDefaultConfigFile } from './core/create-default-config-file';
import { createSchema } from './core/create-schema';
import { buildApp } from './core/build-app';
import { loadConfigFile } from './core/load-config-file';
import { CONFIG_PATHS } from './core/get-config-paths';
import { Config } from './core/types';

export async function init() {
  createDefaultConfigFile();
}

export async function generate(params?: Config) {
  const config = params || await loadConfigFile(CONFIG_PATHS.APP_CONFIG_PATH);

  await createSchema(config);

  await buildApp();
}

export async function preview() {
  console.warn('👷 Preview is not implemented yet. Run a development server of Routerix app! 👷')

  return;
}