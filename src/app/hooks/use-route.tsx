import { useState, createContext, ReactNode, useContext } from 'react';
import { Route } from '../../types';
import { useSchema } from './use-schema';

export type Tab = 'TREE' | 'GRAPH';

interface RouteContextProps {
  route: Route;
  previousRoute?: Route;
  nextRoute?: Route;
  setRoute: (route: Route) => void;
  previous: () => void;
  next: () => void;
}

const RouteContext = createContext({} as RouteContextProps);

interface RouteProviderProps {
  children: ReactNode;
}

export function RouteProvider({ children }: RouteProviderProps) {
  const schema = useSchema();

  const [routes, setRoutes] = useState<{ previous?: Route, current: Route, next?: Route }>({ current: schema.graph });

  function handleSetRoute(route: Route) {
    setRoutes(currentRoutes => ({
      previous: currentRoutes.current,
      current: route
    }));
  }

  function handlePrevious() {
    if (!routes.previous) return;

    setRoutes(currentRoutes => ({
      previous: undefined,
      current: currentRoutes.previous!,
      next: currentRoutes.current
    }));
  }

  function handleNext() {
    if (!routes.next) return;

    setRoutes(currentRoutes => ({
      previous: currentRoutes.current,
      current: currentRoutes.next!,
      next: undefined
    }));
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