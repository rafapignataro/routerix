import { ReactFlowProvider } from "reactflow";
import { useRoute } from "../../hooks/use-route";

import { Header } from "./Header";
import { RouteGraph } from "./RouteGraph";

export function RoutePage() {
  const currentRoute = useRoute();

  return (
    <ReactFlowProvider>
      <div className="h-full flex flex-col flex-1">
        <Header />
        <div className="flex-1 shadow-inner shadow-gray-200">
          <RouteGraph key={currentRoute.route.path} />
        </div>
      </div>
    </ ReactFlowProvider >
  )
}