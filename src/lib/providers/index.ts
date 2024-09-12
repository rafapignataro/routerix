import { Config, Route, RouteElementType, RouteType } from "../core/types";

import { NextJsAppProvider } from "./nextjs-app";
import { NextJsPagesProvider } from "./nextjs-pages";

export interface BaseProvider {
  config: Config;
  getRouteType: (route: Route) => RouteType;
  getRouteElementType: (elementName: string) => RouteElementType;
  parsePath: (params: ParsePathParams) => { route: Route; list: Route[] } | null;
}

export type ParsePathParams = {
  routePath: string;
  parentId?: string | null;
  list?: Route[]
};

export type Provider =
  | 'nextjs-app'
  | 'nextjs-pages';

export const providers: Record<Provider, (config: Config) => BaseProvider> = {
  'nextjs-app': (config: Config) => new NextJsAppProvider(config),
  'nextjs-pages': (config: Config) => new NextJsPagesProvider(config),
}