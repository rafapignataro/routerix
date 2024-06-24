import { Network } from "lucide-react";
import { useSchema } from "../hooks/use-schema";
import { RouteTree } from "./RouteTree";
import { MutableRefObject, useState } from "react";
import { useRouteTree } from "../hooks/use-route-tree";

export function Sidebar() {
  const schema = useSchema();
  const routeTree = useRouteTree();

  return (
    <div className="flex flex-col h-full w-80 bg-white border-r-[1px] border-gray-200 flex-none">
      <div className="flex items-center p-4 gap-2 text-gray-700 h-14 w-full border-b-[1px] border-gray-200 flex-none">
        <Network className="size-6" />
        <h1 className="font-bold text-xl mt-1">Atlas.js</h1>
      </div>
      <div className="overflow-y-auto flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-2">
          <p className="font-semibold text-sm text-gray-600" onClick={() => routeTree.closeAll()}>Routes</p>
          <div className="text-xs text-gray-600">
            <span className="font-semibold">{schema.list.length}</span> routes
          </div>
        </div>
        <div className="w-full border-b-[1px] border-gray-200"></div>
        <div className="pl-4 pb-10 overflow-auto">
          <RouteTree route={schema.graph} />
        </div>
      </div>
    </div>
  )
}