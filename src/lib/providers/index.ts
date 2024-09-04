import { Config, Route, RouteElementType, RouteType } from "../core/types";
import { NextJsAppProvider } from "./nextjs-app";

export interface BaseProvider {
  config: Config;
  getRouteType: (route: Route) => RouteType;
  getRouteElementType: (elementName: string) => RouteElementType;
  parseRoute: (params: ParseRouteParams) => { route: Route; list: Route[] } | null;
}

export type ParseRouteParams = {
  routePath: string;
  parentId?: string | null;
  list?: Route[]
};

export type Provider =
  | 'nextjs-app';

export const providers: Record<Provider, (config: Config) => BaseProvider> = {
  'nextjs-app': (config: Config) => new NextJsAppProvider(config),
}