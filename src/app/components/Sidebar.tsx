import { Network } from "lucide-react";
import { useSchema } from "../hooks/use-schema";
import { RouteTree } from "./RouteTree";

export function Sidebar() {
  const schema = useSchema();

  return (
    <div className="flex flex-col h-full w-80 bg-white border-r-[1px] border-gray-200 flex-none">
      <div className="flex items-center p-4 gap-2 text-gray-700 h-14 w-full border-b-[1px] border-gray-200 flex-none">
        <Network className="size-6" />
        <h1 className="font-bold text-xl mt-1">Atlas</h1>
      </div>
      <div className="overflow-y-auto flex flex-col h-full">
        <p className="px-4 py-2 font-semibold text-sm text-gray-600">Routes</p>
        <div className="w-full border-b-[1px] border-gray-200"></div>
        <div className="pb-10">
          <RouteTree route={schema.routes} />
        </div>
      </div>
    </div>
  )
}