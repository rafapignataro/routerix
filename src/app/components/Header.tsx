import { useRoute } from "../hooks/use-route";
import { Icon, Icons } from "./Icons";
import { Undo, Redo } from 'lucide-react'

export function Header() {
  const { route, previous, next, previousRoute, nextRoute } = useRoute();

  return (
    <div className="h-16 px-4 flex items-center bg-white shadow-sm border-b-[1px] border-gray-200">
      <div className="flex items-stretch gap-6">
        <div className="">
          <span className="text-gray-400 text-sm">Route</span>
          <h3 className="text-lg font-bold">{route.path}</h3>
        </div>
        <div className="space-y-2">
          <span className="text-gray-400 text-sm">Type</span>
          <div className="bg-blue-700 px-1 rounded-sm font-bold text-white text-xs">
            {route.subType}
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-end">
        <div className="flex items-center gap-3">
          <button disabled={!previousRoute} onClick={() => previous()} className="group w-8 h-8 rounded-full cursor-pointer hover:enabled:bg-gray-100 flex items-center justify-center">
            <Undo className="w-5 h-5 stroke-gray-600 group-hover:group-enabled:stroke-gray-800 group-disabled:stroke-gray-400" />
          </button>
          <button disabled={!nextRoute} onClick={() => next()} className="group w-8 h-8 rounded-full cursor-pointer hover:enabled:bg-gray-100 flex items-center justify-center">
            <Redo className="w-5 h-5 stroke-gray-600 group-hover:group-enabled:stroke-gray-800 group-disabled:stroke-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}