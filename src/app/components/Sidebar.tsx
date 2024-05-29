import { useSchema } from "../hooks/use-schema";
import { RouteTree } from "./RouteTree";

export function Sidebar() {
  const schema = useSchema();

  return (
    <div className="h-full w-64 bg-white shadow-md border-r-[1px] border-gray-200 overflow-hidden">
      <div className="h-16 w-full">
        <h1 className="p-4 font-bold text-2xl">Atlas</h1>
      </div>
      <div className="p-4 overflow-y-auto">
        <p className="font-semibold text-sm text-gray-600">Routes</p>
        <div className="py-2">
          <RouteTree route={schema.routes} />
        </div>
      </div>
    </div>
  )
}