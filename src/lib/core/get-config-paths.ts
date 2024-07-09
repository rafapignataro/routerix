import path from 'path';

const LIBRARY_PATH = path.resolve(process.cwd(), 'node_modules', 'routerix')
const APP_PATH = process.cwd();

export const CONFIG_PATHS = {
  LIBRARY_PATH,
  LIBRARY_VITE_PATH: path.resolve(LIBRARY_PATH, 'src', 'app'),
  LIBRARY_VITE_BUILD_PATH: path.resolve(LIBRARY_PATH, 'build'),
  APP_PATH,
  APP_CONFIG_PATH: path.resolve(APP_PATH, 'routerix.config.js'),
  APP_GENERATION_PATH: path.resolve(APP_PATH, '.routerix'),
  APP_GENERATION_BUILD_PATH: path.resolve(APP_PATH, '.routerix', 'build'),
} as const;