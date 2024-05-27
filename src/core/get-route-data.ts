export function getRouteData(route: string) {
  if (route[0] === '(' && route.at(-1) === ')') {
    return { subType: 'container' } as const;
  }

  if (route[0] === '[' && route.at(-1) === ']') {
    return { subType: 'dynamic', param: route.slice(1, route.length - 1) } as const;
  }

  return { subType: 'default' } as const;
}