import path from 'path';

const LIBRARY_ROOT_PATH = path.resolve(process.cwd(), 'node_modules', 'routerix');
const LIBRARY_BUILD_PATH = path.resolve(LIBRARY_ROOT_PATH, 'dist');
const USER_PATH = process.cwd();

export const CONFIG_PATHS = {
  LIBRARY_BUILD_PATH,
  LIBRARY_VITE_PATH: path.resolve(LIBRARY_BUILD_PATH, 'app'),
  LIBRARY_VITE_BUILD_PATH: path.resolve(LIBRARY_BUILD_PATH, 'build'),
  LIBRARY_VITE_CONFIG_PATH: path.resolve(LIBRARY_BUILD_PATH, 'app', 'vite.config.ts'),
  USER_PATH,
  APP_CONFIG_PATH: path.resolve(USER_PATH, 'routerix.config.js'),
} as const;
