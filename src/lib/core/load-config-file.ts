import { RawConfig } from "./types";

export async function loadConfigFile(configFile: string) {
  try {
    const module = await import(configFile);

    if (!module.default) throw 'Missing default export in config file';

    const config = module.default as RawConfig;

    return config;
  } catch (error: any) {
    return null;
  }
}