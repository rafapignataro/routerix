export interface Config {
  rootPath: string;
};

export interface Route {
  id: string;
  name: string;
  type: 'route';
  subType: 'default' | 'container' | 'dynamic';
  path: string;
  fullPath: string;
  parentId?: string;
  children: Record<string, Route | RouteElement>;
};

export interface RouteElement {
  id: string;
  name: string;
  type: 'element';
  subType: 'page' | 'layout' | 'loading' | 'not-found' | 'unknown';
};

export interface Schema {
  id: string;
  createdAt: number;
  routes: Route;
}