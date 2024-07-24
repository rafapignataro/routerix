import fs from "fs";
import path from "path";

import { providers } from "../providers";
import { RawConfig, Config } from "./types";

export async function validateConfig(rawConfig: RawConfig) {
  if (!rawConfig.rootPath) return { success: false, error: 'Missing "rootPath" in config' };
  if (!rawConfig.provider) return { success: false, error: 'Missing "provider" in config' };

  if (!providers[rawConfig.provider]) return {
    success: false,
    error: 'Provider not found. Please check README for current supported providers.'
  };

  try {
    const rootStats = fs.statSync(rawConfig.rootPath);

    if (!rootStats.isDirectory()) return { success: false, error: 'Root must be a directory' };

    const resolvedRootPath = path.resolve(rawConfig.rootPath).replace(process.cwd(), '');

    const config: Config = {
      provider: rawConfig.provider,
      rootPath: resolvedRootPath
    }

    return { success: true, data: config };
  } catch (err) {
    return { success: false, error: 'Something is wrong with "rootPath". Is it the correct path?' }
  }
}