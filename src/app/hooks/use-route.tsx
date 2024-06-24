import { useState, createContext, ReactNode, useContext } from 'react';
import { Route } from '../../lib/core/types';
import { useSchema } from './use-schema';
import { useRouteTree } from './use-route-tree';

export type Tab = 'TREE' | 'GRAPH';

interface RouteContextProps {
  route: Route;
  previousRoute?: Route;
  nextRoute?: Route;
  setRoute: (route: Route, triggerTree?: boolean) => void;
  previous: () => void;
  next: () => void;
}

const RouteContext = createContext({} as RouteContextProps);

interface RouteProviderProps {
  children: ReactNode;
}

export function RouteProvider({ children }: RouteProviderProps) {
  const schema = useSchema();
  const routeTree = useRouteTree();

  const [routes, setRoutes] = useState<{ previous?: Route, current: Route, next?: Route }>({ current: schema.graph });

  function handleSetRoute(route: Route, triggerTree = false) {
    setRoutes(currentRoutes => ({
      previous: currentRoutes.current,
      current: route
    }));

    if (triggerTree && route.parentId) routeTree.open(route.id, true);
  }

  function handlePrevious() {
    if (!routes.previous) return;

    setRoutes(currentRoutes => ({
      previous: undefined,
      current: currentRoutes.previous!,
      next: currentRoutes.current
    }));

    if (routes.previous && routes.previous.parentId) routeTree.open(routes.previous.id, true);
  }

  function handleNext() {
    if (!routes.next) return;

    setRoutes(currentRoutes => ({
      previous: currentRoutes.current,
      current: currentRoutes.next!,
      next: undefined
    }));

    if (routes.next && routes.next.parentId) routeTree.open(routes.next.id, true);
  }

  return (
    <RouteContext.Provider value={{
      route: routes.current,
      previousRoute: routes.previous,
      nextRoute: routes.next,
      setRoute: handleSetRoute,
      previous: handlePrevious,
      next: handleNext
    }}>
      {children}
    </RouteContext.Provider>
  )
}

export function useRoute() {
  const context = useContext(RouteContext);

  if (!context || !Object.keys(context).length) throw new Error(`${useRoute.name} can't be used outside of ${RouteProvider.name}.`);

  return context;
}