import { ReactFlowProvider } from "reactflow";
import { useRoute } from "../../hooks/use-route";

import { Header } from "./Header";
import { RouteGraph } from "./RouteGraph";

export function RoutePage() {
  const currentRoute = useRoute();

  return (
    <ReactFlowProvider>
      <div className="h-full flex flex-col flex-1 relative">
        <Header />
        <div className="flex-1 shadow-inner shadow-gray-200 flex">
          <RouteGraph key={currentRoute.route.path} />
          <div className="flex-none h-full w-72 bg-white border-l-[1px] z-10 shadow-md shadow-gray-200">
            <p className="px-4 py-2 font-semibold text-sm text-gray-600">Route details</p>
            <div className="w-full border-b-[1px] border-gray-200"></div>
            <div className="space-y-2 p-4">
              <div>
                <span className="text-gray-400 text-sm">Route</span>
                <h3 className="font-bold leading-none text-gray-700">{currentRoute.route.path}</h3>
              </div>
              <div>
                <span className="text-gray-400 text-sm">Full path</span>
                <h3 className="font-bold leading-4 text-gray-700 text-sm">{currentRoute.route.fullPath}</h3>
              </div>
              <div>
                <span className="text-gray-400 text-sm block">Type</span>
                <div className="bg-blue-700 px-1 rounded-sm font-bold text-white text-xs inline-block">
                  {currentRoute.route.type}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ ReactFlowProvider >
  )
}