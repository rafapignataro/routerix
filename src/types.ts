export interface Config {
  rootPath: string;
};

export interface Route {
  id: string;
  name: string;
  kind: 'route';
  type: 'default' | 'container' | 'dynamic' | 'api';
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
  kind: 'element';
  type: 'page' | 'layout' | 'loading' | 'not-found' | 'unknown';
};

export interface Schema {
  id: string;
  createdAt: number;
  graph: Route;
  list: Route[];
}