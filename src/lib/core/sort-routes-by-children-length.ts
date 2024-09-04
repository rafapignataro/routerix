import { Route } from "./types";

export function sortRoutesByChildrenLength(route: Route) {
  const list = Object.values(route.routes)
    .sort((a, b) => {
      const hasChildrenA = !!Object.keys(a.routes).length;
      const hasChildrenB = !!Object.keys(b.routes).length;

      if (hasChildrenA && !hasChildrenB) return -1;

      if (!hasChildrenA && hasChildrenB) return 1;

      return 0;
    })

  const record: Record<string, Route> = {};

  list.forEach(r => record[r.name] = r)

  return { record, list }
}