import { Config, Route } from "../core/types";

import { BaseProvider, ParsePathParams } from '.';
import { sortRoutesByChildrenLength } from '../core/sort-routes-by-children-length';
import { getPathInfo } from '../utils';

function isContainerDirectory(name: string) {
  return name[0] === '(' && name.at(-1) === ')'
}

function getFullPath(relativePath: string) {
  const parts = relativePath.split('/');

  const rootIndex = parts.findIndex(part => part === 'app');

  if (rootIndex === -1) return '/';

  const fullPath = parts
    .slice(rootIndex + 1)
    .join('/')
    .replace('app', '')
    .split('/')
    .filter(part => !isContainerDirectory(part))
    .join('/')

  return `/${fullPath}`;
}

export class NextJsAppProvider implements BaseProvider {
  constructor(public config: Config) { }

  getRouteType(route: Route) {
    if (route.name.at(0) === '[' && route.name.at(-1) === ']') {
      return 'dynamic';
    } else if (route.elements['page']) {
      return 'page';
    } else if (route.elements['route']) {
      return 'api';
    }

    return 'not-found';
  };

  getRouteElementType(elementName: string) {
    switch (elementName) {
      case "page":
        return "page" as const;
      case "layout":
        return "layout" as const;
      case "loading":
        return "loading" as const;
      case "not-found":
        return "not-found" as const;
      default:
        return "unknown" as const;
    }
  }

  parsePath({ routePath, parentId = null, list = [] }: ParsePathParams) {
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
      fullPath: getFullPath(pathInfo.relativePath),
      type: 'not-found',
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

      const parsedPath = this.parsePath({
        routePath: childPathInfo.absolutePath,
        parentId: isContainer ? parentId : route.id,
        list
      });

      if (!parsedPath) continue;

      // If is just a container directory (e.g. (folder)), forward the route and its routes to the parent
      if (isContainer) {
        route.routes = { ...route.routes, ...parsedPath.route.routes };
        route.elements = { ...route.elements, ...parsedPath.route.elements };
        continue;
      }

      list.push(parsedPath.route);

      route.routes[childPathInfo.name] = parsedPath.route;
    }

    route.type = this.getRouteType(route);

    route.routes = sortRoutesByChildrenLength(route).record;

    return { route, list };
  }
}