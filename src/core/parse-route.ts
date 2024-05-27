import fs from 'fs';
import path from 'path';

import { Config, Route } from "../types";
import { getRouteData } from './get-route-data';
import { parseRouteElement } from './parse-route-element';
import { PATHS_CONFIG } from '..';

export function parseRoute(config: Config, routePath: string): Route {
  const routeName = path.basename(routePath);
  const routeResolvedPath = path.resolve(path.join(PATHS_CONFIG.APP_PATH, routePath));
  const routeStats = fs.statSync(routeResolvedPath);

  if (!routeStats.isDirectory()) throw new Error('❌ A route must be a directory');

  const routeFiles = fs.readdirSync(routeResolvedPath, { withFileTypes: true });

  const route: Route = {
    id: crypto.randomUUID(),
    type: 'route',
    name: routeName,
    path: routePath.replace(config.rootPath, '') || '/',
    fullPath: routePath,
    ...getRouteData(routeName),
    children: {}
  };

  for (const routeFile of routeFiles) {
    route.children[routeFile.name] = parseRouteElement(
      config,
      path.join(routePath, routeFile.name)
    );
  }

  return route;
}