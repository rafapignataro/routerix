import { Config } from "../types";

export async function loadConfig(configFile: string) {
  try {
    const module = await import(configFile);

    if (!module.default) throw 'Missing default export in config file';

    const config = module.default as Config;

    return config
  } catch (error: any) {
    throw new Error(`LOAD_CONFIG: ${error.message}`);
  }
}