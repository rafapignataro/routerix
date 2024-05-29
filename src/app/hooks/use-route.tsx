import { useState, createContext, ReactNode, useContext } from 'react';
import { Route } from '../../types';
import { useSchema } from './use-schema';

export type Tab = 'TREE' | 'GRAPH';

interface RouteContextProps {
  route: Route;
  setRoute: (route: Route) => void;
}

const RouteContext = createContext({} as RouteContextProps);

interface RouteProviderProps {
  children: ReactNode;
}

export function RouteProvider({ children }: RouteProviderProps) {
  const schema = useSchema();

  const [route, setRoute] = useState<Route>(schema.routes);

  function handleSetRoute(route: Route) {
    setRoute(route)
  }

  console.log('ROUTE OG', route)
  return (
    <RouteContext.Provider value={{ route, setRoute: handleSetRoute }}>
      {children}
    </RouteContext.Provider>
  )
}

export function useRoute() {
  const context = useContext(RouteContext);

  if (!context || !Object.keys(context).length) throw new Error(`${useRoute.name} can't be used outside of ${RouteProvider.name}.`);

  return context;
}