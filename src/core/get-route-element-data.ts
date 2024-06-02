export function getRouteElementData(route: string) {
  switch (route) {
    case "page.tsx":
    case "page.js":
      return { type: "page" } as const;
    case "layout.tsx":
    case "layout.js":
      return { type: "layout" } as const;
    case "loading.tsx":
    case "loading.js":
      return { type: "loading" } as const;
    case "not-found.tsx":
    case "not-found.js":
      return { type: "not-found" } as const;
    default:
      return { type: "unknown" } as const;
  }
}