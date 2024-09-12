import { Config, Route, RouteElementType, RouteType } from "../core/types";
import { BaseProvider, ParsePathParams } from '.';
import { sortRoutesByChildrenLength } from '../core/sort-routes-by-children-length';
import { getPathInfo, PathInfo } from '../utils';

function getFullPath(relativePath: string) {
  const parts = relativePath.split('/');

  const rootIndex = parts.findIndex(part => part === 'pages');

  if (rootIndex === -1) return '/';

  const fullPath = `/${parts.slice(rootIndex + 1).join('/')}`;

  if (fullPath.includes('.')) return fullPath.split('.')[0]!;

  return fullPath;
}

export class NextJsPagesProvider implements BaseProvider {
  constructor(public config: Config) { }

  getRouteType(route: Route) {
    if (route.name === '_app' || route.name === '_document') {
      return 'not-found';
    }

    if (route.name.startsWith('[') && route.name.endsWith(']')) {
      return 'dynamic';
    }

    return 'page';
  }

  getRouteElementType(elementName: string) {
    switch (elementName) {
      case "index.tsx":
      case "index.js":
        return "page" as const;
      case "404.tsx":
      case "404.js":
        return "not-found" as const;
      default:
        return "unknown" as const;
    }
  }

  createRoute({ pathInfo, parentId }: { pathInfo: PathInfo, parentId: string | null }) {
    const isRoot = !parentId;

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

    return route;
  }

  parsePath({ routePath, parentId = null, list = [] }: ParsePathParams) {
    const pathInfo = getPathInfo({ path: routePath });

    if (!pathInfo) throw new Error('❌ Path to route not found');

    if (pathInfo.type === 'folder') {
      if (pathInfo.isEmpty) return null;

      const route = this.createRoute({ pathInfo, parentId });

      const hasIndex = !!pathInfo.children['index'];

      if (hasIndex) route.type = routePath.includes('/api') ? 'api' : 'page';

      for (const childPathInfo of Object.values(pathInfo.children)) {
        if (childPathInfo.type === 'file' && childPathInfo.name === 'index') continue;

        const parsedPath = this.parsePath({
          routePath: childPathInfo.absolutePath,
          parentId: route?.id || null,
          list
        });

        if (!parsedPath) continue;

        list.push(parsedPath.route);
        route.routes[childPathInfo.name] = parsedPath.route;
      }

      route.routes = sortRoutesByChildrenLength(route).record;

      return { route, list };
    }

    const route = this.createRoute({ pathInfo, parentId });

    route.type = this.getRouteType(route);

    if (route.type === 'not-found') return null;

    return { route, list };
  }
}