export function getRouteElementData(route: string) {
  switch (route) {
    case "page.tsx":
    case "page.js":
      return { subType: "page" } as const;
    case "layout.tsx":
    case "layout.js":
      return { subType: "layout" } as const;
    case "loading.tsx":
    case "loading.js":
      return { subType: "loading" } as const;
    case "not-found.tsx":
    case "not-found.js":
      return { subType: "not-found" } as const;
    default:
      return { subType: "unknown" } as const;
  }
}