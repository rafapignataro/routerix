import fs from 'fs';
import path from 'path';

import { Config, Route, RouteElement } from "../types";
import { getRouteData } from './get-route-data';
import { PATHS_CONFIG } from '..';
import { getRouteElementData } from './get-route-element-data';

export function parseRoute(config: Config, routePath: string, parentId?: string, list: Route[] = []) {
  const routeName = path.basename(routePath);
  const routeResolvedPath = path.resolve(path.join(PATHS_CONFIG.APP_PATH, routePath));
  const routeStats = fs.statSync(routeResolvedPath);

  if (!routeStats.isDirectory()) throw new Error('❌ A route must be a directory');

  const routeFiles = fs.readdirSync(routeResolvedPath, { withFileTypes: true });

  const isRoot = routePath.replace(config.rootPath, '') === '';

  const rawFullPath = routePath.replace(config.rootPath, '') || '/';
  const rawFullPathParts = rawFullPath.split('/').filter(part => part[0] !== '(' && part.at(-1) !== ')');

  const route: Route = {
    kind: 'route',
    id: crypto.randomUUID(),
    parentId,
    name: isRoot ? 'root' : routeName,
    path: isRoot ? '/' : `/${routeName}`,
    fullPath: rawFullPathParts.join('/'),
    ...getRouteData(routeName),
    routes: {},
    elements: {},
  };

  if (route.type !== 'container') list.push(route);

  for (const routeFile of routeFiles) {
    const routeFilePath = path.join(routePath, routeFile.name);
    const routeResolvedPath = path.resolve(path.join(PATHS_CONFIG.APP_PATH, routeFilePath));

    const routeFileName = path.basename(routeResolvedPath);

    const routeFileStats = fs.statSync(routeResolvedPath);

    if (routeFileStats.isDirectory()) {
      const parsedRoute = parseRoute(config, routeFilePath, parentId, list);

      if (!parsedRoute) continue;

      if (parsedRoute.route.type === 'container') {
        route.routes = { ...route.routes, ...parsedRoute.route.routes };
        continue;
      }

      route.routes[routeFile.name] = parsedRoute.route;

      continue;
    }

    const routeElement: RouteElement = {
      kind: 'element',
      id: crypto.randomUUID(),
      parentId,
      name: routeFileName,
      ...getRouteElementData(routeFileName)
    }

    route.elements[routeFile.name] = routeElement;
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

  return { route, list };
}