export function getRouteData(route: string) {
  if (route[0] === '(' && route.at(-1) === ')') {
    return { type: 'container' } as const;
  }

  if (route[0] === '[' && route.at(-1) === ']') {
    return { type: 'dynamic', param: route.slice(1, route.length - 1) } as const;
  }

  return { type: 'default' } as const;
}