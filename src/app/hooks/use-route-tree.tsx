import { useSchema } from "./use-schema";

export function useRouteTree() {
  const schema = useSchema();

  function getRouteElement(routeId: string) {
    return document.getElementById(`route-tree-${routeId}`) as HTMLDetailsElement | null;
  }

  function open(routeId: string, openParent = false) {
    const routeElement = getRouteElement(routeId);

    if (!routeElement) return;

    routeElement.open = true;

    if (openParent) {
      const route = schema.list.find(r => r.id === routeId);

      if (!route || !route.parentId) return;

      open(route.parentId, openParent);
    }
  }

  function close(routeId: string) {
    const routeElement = getRouteElement(routeId);

    if (!routeElement) return;

    routeElement.open = false;
  }

  function closeAll() {
    const routeElements = document.getElementsByClassName('route-parent') as HTMLCollectionOf<HTMLDetailsElement>;

    for (const routeElement of routeElements) {
      routeElement.open = false;
    }
  }

  return {
    getRouteElement,
    open,
    close,
    closeAll
  }
}