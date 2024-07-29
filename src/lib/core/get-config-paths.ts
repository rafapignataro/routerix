import path from 'path';

const LIBRARY_PATH = path.resolve(process.cwd(), 'node_modules', 'routerix', 'dist');
const APP_PATH = process.cwd();

export const CONFIG_PATHS = {
  LIBRARY_PATH,
  LIBRARY_VITE_PATH: path.resolve(LIBRARY_PATH, 'app'),
  LIBRARY_VITE_BUILD_PATH: path.resolve(LIBRARY_PATH, 'build'),
  LIBRARY_VITE_CONFIG_PATH: path.resolve(LIBRARY_PATH, 'app', 'vite.config.ts'),
  APP_PATH,
  APP_CONFIG_PATH: path.resolve(APP_PATH, 'routerix.config.js'),
} as const;
console.log(CONFIG_PATHS)
