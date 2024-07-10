import path from 'path';
import fs from 'fs';

import { Route, RouteElement } from "../core/types";
import { CONFIG_PATHS } from '../core/get-config-paths';

import { BaseProvider, ParseRouteParams } from '.';

export class NextJsAppProvider implements BaseProvider {
  constructor() { }

  getRouteType(routeName: string) {
    if (routeName[0] === '(' && routeName.at(-1) === ')') return 'container' as const;

    if (routeName[0] === '[' && routeName.at(-1) === ']') return 'dynamic' as const;

    return 'default' as const;
  };

  getRouteElementType(elementName: string) {
    switch (elementName) {
      case "page.tsx":
      case "page.js":
        return "page" as const;
      case "layout.tsx":
      case "layout.js":
        return "layout" as const;
      case "loading.tsx":
      case "loading.js":
        return "loading" as const;
      case "not-found.tsx":
      case "not-found.js":
        return "not-found" as const;
      default:
        return "unknown" as const;
    }
  }

  parseRoute({ config, routePath, parentId = null, list = [] }: ParseRouteParams) {
    const routeName = path.basename(routePath);
    const routeResolvedPath = path.resolve(path.join(CONFIG_PATHS.APP_PATH, routePath));

    let routeStats: fs.Stats | undefined;

    try {
      routeStats = fs.statSync(routeResolvedPath);
    } catch (err) {
      throw new Error('❌ Path not found');
    }

    if (!routeStats.isDirectory()) throw new Error('❌ A route must be a directory');

    const routeFiles = fs.readdirSync(routeResolvedPath, { withFileTypes: true });

    const isRoot = routePath.replace(config.rootPath, '') === '';

    const rawFullPath = routePath.replace(config.rootPath, '') || '/';
    const rawFullPathParts = rawFullPath.split('/').filter(part => part[0] !== '(' && part.at(-1) !== ')');

    const routeId = crypto.randomUUID();

    const route: Route = {
      id: routeId,
      parentId,
      name: isRoot ? 'root' : routeName,
      path: isRoot ? '/' : `/${routeName}`,
      fullPath: rawFullPathParts.join('/'),
      type: this.getRouteType(routeName),
      routes: {},
      elements: {},
    };

    if (route.type !== 'container') list.push(route);

    for (const routeFile of routeFiles) {
      const routeFilePath = path.join(routePath, routeFile.name);
      const routeResolvedPath = path.resolve(path.join(CONFIG_PATHS.APP_PATH, routeFilePath));

      const routeFileName = path.basename(routeResolvedPath);

      const routeFileStats = fs.statSync(routeResolvedPath);

      if (routeFileStats.isDirectory()) {
        const parsedRoute = this.parseRoute({
          config,
          routePath: routeFilePath,
          parentId: route.type !== 'container' ? routeId : parentId,
          list
        });

        if (!parsedRoute) continue;

        if (parsedRoute.route.type === 'container') {
          route.routes = { ...route.routes, ...parsedRoute.route.routes };
          continue;
        }

        route.routes[routeFile.name] = parsedRoute.route;

        continue;
      }

      const routeElement: RouteElement = {
        id: crypto.randomUUID(),
        parentId: routeId,
        name: routeFileName,
        type: this.getRouteElementType(routeFileName)
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
}