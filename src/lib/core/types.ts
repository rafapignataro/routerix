export interface Config {
  rootPath: string;
};

export interface Route {
  id: string;
  name: string;
  type: RouteType;
  path: string;
  fullPath: string;
  parentId?: string;
  routes: Record<string, Route>;
  elements: Record<string, Route | RouteElement>;
};

export interface RouteElement {
  id: string;
  parentId?: string;
  name: string;
  type: RouteElementType;
};

export interface Schema {
  id: string;
  createdAt: number;
  graph: Route;
  list: Route[];
}

export type RouteType =
  | 'default'
  | 'dynamic'
  | 'api'
  | 'container';

export type RouteElementType =
  | 'page'
  | 'layout'
  | 'loading'
  | 'not-found'
  | 'unknown';

export interface BaseProvider {
  getRouteType: (routeName: string) => RouteType;
  getRouteElementType: (elementName: string) => RouteElementType;
  parseRoute: (params: ParseRouteParams) => ParseRouteResponse;
}

export type ParseRouteParams = {
  config: Config;
  routePath: string;
  parentId?: string;
  list?: Route[]
};

export type ParseRouteResponse = { route: Route; list: Route[] } | null;

export type Providers =
  | 'nextjs-app';