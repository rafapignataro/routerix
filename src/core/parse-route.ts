import fs from 'fs';
import path from 'path';

import { Config, Route } from "../types";
import { getRouteData } from './get-route-data';
import { parseRouteElement } from './parse-route-element';
import { PATHS_CONFIG } from '..';

export function parseRoute(config: Config, routePath: string) {
  const routeName = path.basename(routePath);
  const routeResolvedPath = path.resolve(path.join(PATHS_CONFIG.APP_PATH, routePath));
  const routeStats = fs.statSync(routeResolvedPath);

  if (!routeStats.isDirectory()) throw new Error('❌ A route must be a directory');

  const routeFiles = fs.readdirSync(routeResolvedPath, { withFileTypes: true });

  const isRoot = routePath.replace(config.rootPath, '') === '';

  const route: Route = {
    kind: 'route',
    id: crypto.randomUUID(),
    name: isRoot ? 'root' : routeName,
    path: isRoot ? '/' : `/${routeName}`,
    fullPath: routePath.replace(config.rootPath, '') || '/',
    ...getRouteData(routeName),
    routes: {},
    elements: {}
  };

  for (const routeFile of routeFiles) {
    const element = parseRouteElement(
      config,
      path.join(routePath, routeFile.name)
    );

    if (!element) continue;

    if (element.kind === 'route') {
      if (element.type === 'container') {
        route.routes = { ...route.routes, ...element.routes };
        continue;
      }

      route.routes[routeFile.name] = element;

      continue;
    }

    if (element.kind === 'element') route.elements[routeFile.name] = element;
  }

  const routeRoutes = Object.values(route.routes);
  const routeElements = Object.values(route.elements);

  if (!routeRoutes.length && !routeElements.length) return null;

  if (
    !routeRoutes.length &&
    (!route.elements['page.tsx'] && !route.elements['route.ts'])
  ) return null;


  const sortedRoutes = routeRoutes
    .sort((a, b) => {
      const hasChildrenA = !!Object.keys(a.routes).length;
      const hasChildrenB = !!Object.keys(b.routes).length;

      if (hasChildrenA && !hasChildrenB) return -1;

      if (!hasChildrenA && hasChildrenB) return 1;

      return 0;
    })

  route.routes = {};
  sortedRoutes.forEach(r => route.routes[r.name] = r)

  return route;
}

function isRoute() {

}