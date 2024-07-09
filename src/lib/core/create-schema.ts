import path from 'path';

import { loadConfigFile } from "./load-config-file";
import { Config, Schema } from "./types";
import { Provider, providers } from '../providers';
import { saveFile } from '../utils';
import { CONFIG_PATHS } from './get-config-paths';

interface CreateSchemaParams {
  provider: Provider;
  rootPath: string;
}

export async function createSchema(config: Config) {

  const provider = providers[config.provider]();

  const parsedRoute = provider.parseRoute({
    config: config,
    routePath: config.rootPath,
    parentId: null
  });

  if (!parsedRoute) throw new Error('❌ Root directory is empty');

  const schema: Schema = {
    id: crypto.randomUUID(),
    createdAt: new Date().getTime(),
    graph: parsedRoute.route,
    list: parsedRoute.list,
  }

  saveFile({
    fileName: 'schema.json',
    destination: CONFIG_PATHS.LIBRARY_VITE_PATH,
    content: JSON.stringify(schema, null, 2)
  });

  console.log('✅ Schema created successfully!');
}