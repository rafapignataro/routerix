import { Config, Route, RouteElementType, RouteType } from "../core/types";
import { NextJsAppProvider } from "./nextjs-app";

export interface BaseProvider {
  getRouteType: (routeName: string) => RouteType;
  getRouteElementType: (elementName: string) => RouteElementType;
  parseRoute: (params: ParseRouteParams) => { route: Route; list: Route[] } | null;
}

export type ParseRouteParams = {
  config: Config;
  routePath: string;
  parentId?: string;
  list?: Route[]
};

export type Provider =
  | 'nextjs-app';

export const providers = {
  'nextjs-app': () => new NextJsAppProvider(),
}