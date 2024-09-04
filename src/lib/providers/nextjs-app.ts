import { Config, Route } from "../core/types";

import { BaseProvider, ParseRouteParams } from '.';
import { sortRoutesByChildrenLength } from '../core/sort-routes-by-children-length';
import { getPathInfo } from '../utils';

function isContainerDirectory(name: string) {
  return name[0] === '(' && name.at(-1) === ')'
}

export class NextJsAppProvider implements BaseProvider {
  constructor(public config: Config) { }

  getRouteType(route: Route) {
    if (route.name.at(0) === '[' && route.name.at(-1) === ']') {
      return 'dynamic';
    } else if (route.elements['page.tsx'] || route.elements['page.js']) {
      return 'page';
    } else if (route.elements['route.ts'] || route.elements['route.js']) {
      return 'api';
    }

    return 'empty-path';
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

  parseRoute({ routePath, parentId = null, list = [] }: ParseRouteParams) {
    const isRoot = !parentId;

    const pathInfo = getPathInfo({ path: routePath });

    if (!pathInfo) throw new Error('❌ Path to route not found');

    if (isRoot && pathInfo.type !== 'folder') throw new Error('❌ The root must be a directory');

    if (pathInfo.type !== 'folder') return null;

    if (pathInfo.isEmpty) return null;

    const route: Route = {
      id: crypto.randomUUID(),
      parentId,
      name: isRoot ? 'root' : pathInfo.name,
      path: isRoot ? '/' : `/${pathInfo.name}`,
      fullPath: pathInfo.relativePath
        .replace('app', '')
        .split('/')
        .filter(part => !isContainerDirectory(part))
        .join('/') || '/',
      type: 'empty-path',
      routes: {},
      elements: {},
    }

    for (const childPathInfo of Object.values(pathInfo.children)) {
      if (childPathInfo.type === 'file') {
        route.elements[childPathInfo.name] = {
          id: crypto.randomUUID(),
          parentId: route.id,
          name: childPathInfo.name,
          type: this.getRouteElementType(childPathInfo.name)
        }
        continue;
      }

      const isContainer = isContainerDirectory(childPathInfo.name);

      const parsedRoute = this.parseRoute({
        routePath: childPathInfo.absolutePath,
        parentId: isContainer ? parentId : route.id,
        list
      });

      if (!parsedRoute) continue;

      // If is just a container directory (e.g. (folder)), forward the route and its routes to the parent
      if (isContainer) {
        route.routes = { ...route.routes, ...parsedRoute.route.routes };
        route.elements = { ...route.elements, ...parsedRoute.route.elements };
        continue;
      }

      list.push(parsedRoute.route);

      route.routes[childPathInfo.name] = parsedRoute.route;
    }

    route.type = this.getRouteType(route);

    route.routes = sortRoutesByChildrenLength(route).record;

    return { route, list };
  }
}