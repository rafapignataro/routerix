import { useState, createContext, ReactNode, useContext } from 'react';

export type Tab = 'TREE' | 'GRAPH';

interface TabContextProps {
  tab: Tab;
  setTab: (tab: Tab) => void;
}

const TabContext = createContext({} as TabContextProps);

interface TabProviderProps {
  children: ReactNode;
}

export function TabProvider({ children }: TabProviderProps) {
  const [tab, setTab] = useState<Tab>('GRAPH');

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  )
}

export function useTab() {
  const context = useContext(TabContext);

  if (!context || !Object.keys(context).length) throw new Error(`${useTab.name} can't be used outside of ${TabProvider.name}.`);

  return context;
}