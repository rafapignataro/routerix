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
    kind: 'route',
    id: crypto.randomUUID(),
    name: routeName,
    path: routePath.replace(config.rootPath, '') || '/',
    fullPath: routePath,
    ...getRouteData(routeName),
    routes: {},
    elements: {}
  };

  for (const routeFile of routeFiles) {
    const element = parseRouteElement(
      config,
      path.join(routePath, routeFile.name)
    );

    if (element.kind === 'route') route.routes[routeFile.name] = element;
    if (element.kind === 'element') route.elements[routeFile.name] = element;
  }

  return route;
}

function isRoute() {

}