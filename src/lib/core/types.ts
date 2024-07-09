import { Provider } from "../providers";

export interface Config {
  provider: Provider;
  rootPath: string;
};

export interface Route {
  id: string;
  name: string;
  type: RouteType;
  path: string;
  fullPath: string;
  parentId: string | null;
  routes: Record<string, Route>;
  elements: Record<string, Route | RouteElement>;
};

export interface RouteElement {
  id: string;
  parentId: string;
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