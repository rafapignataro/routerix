import fs from 'fs';
import path from 'path';

import { Config, Route, RouteElement } from "../types";
import { getRouteElementData } from './get-route-element-data';
import { parseRoute } from './parse-route';
import { PATHS_CONFIG } from '..';

export function parseRouteElement(config: Config, elementPath: string): Route | RouteElement | null {
  const elementName = path.basename(elementPath);
  const elementResolvedPath = path.resolve(path.join(PATHS_CONFIG.APP_PATH, elementPath));
  const elementStats = fs.statSync(elementResolvedPath);

  if (elementStats.isDirectory()) return parseRoute(config, elementPath);

  const routeElement: RouteElement = {
    kind: 'element',
    id: crypto.randomUUID(),
    name: elementName,
    ...getRouteElementData(elementName)
  }

  return routeElement;
}