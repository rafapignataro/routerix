
import { providers } from '../providers';
import { saveFile } from '../utils';
import { CONFIG_PATHS } from './get-config-paths';
import { Config, Schema } from "./types";
import path from 'path';

export async function createSchema(config: Config) {
  const provider = providers[config.provider](config);

  const routeDirectoryPath = path.resolve(path.join(CONFIG_PATHS.USER_PATH, config.rootPath));

  const parsedRoute = provider.parseRoute({
    routePath: routeDirectoryPath,
  });

  if (!parsedRoute) return console.error('❌ Root directory is empty');

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

  console.info('✅ Schema created successfully! Creating UI files... \n');
}