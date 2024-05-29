import { useSchema } from './hooks/use-schema';
import { Header } from './components/Header';

import { RouteGraph } from './components/RouteGraph';
import { Sidebar } from './components/Sidebar';
import { useRoute } from './hooks/use-route';

export function App() {
  const currentRoute = useRoute();

  return (
    <div className="h-screen w-full flex items-start">
      <Sidebar />
      <div className="h-full flex flex-col flex-1">
        <Header />
        <div className="flex-1">
          <RouteGraph key={currentRoute.route.path} />
        </div>
      </div>
    </div>
  );
};