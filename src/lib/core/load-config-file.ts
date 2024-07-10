import path from 'path';
import fs from 'fs';

import { Config } from "./types";

export async function loadConfigFile(configFile: string) {
  try {
    console.info('\n ⚙️ No args passed to CLI, using config file... \n');

    const module = await import(configFile);

    if (!module.default) throw 'Missing default export in config file';

    const config = module.default as Config;

    const rootStats = fs.statSync(config.rootPath);

    if (!rootStats.isDirectory()) throw 'Root must be a directory';

    const resolvedRootPath = path.resolve(config.rootPath).replace(process.cwd(), '');

    return { rootPath: resolvedRootPath } as Config;
  } catch (error: any) {
    return null;
  }
}