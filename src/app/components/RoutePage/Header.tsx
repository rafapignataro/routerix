import { Undo, Redo } from 'lucide-react'
import { useRoute } from '../../hooks/use-route';

export function Header() {
  const { route, previous, next, previousRoute, nextRoute } = useRoute();

  return (
    <div className="h-16 px-4 flex items-center justify-between bg-white border-b-[1px] border-gray-200">
      <div className="flex items-stretch gap-6">
        <div className="">
          <span className="text-gray-400 text-sm">Route</span>
          <h3 className="font-bold text-gray-800">{route.path}</h3>
        </div>
        <div className="space-y-2">
          <span className="text-gray-400 text-sm">Type</span>
          <div className="bg-blue-700 px-1 rounded-sm font-bold text-white text-xs">
            {route.subType}
          </div>
        </div>
      </div>
      <div className="h-full flex items-center pl-4 gap-1 border-l-[1px] border-gray-200">
        <button
          disabled={!previousRoute}
          onClick={() => previous()}
          title={`${!!previousRoute ? `Go to ${previousRoute.name} route` : 'Go to previous route'}`}
          className="group w-8 h-8 rounded-md cursor-pointer hover:enabled:bg-gray-100 flex items-center justify-center"
        >
          <Undo className="w-5 h-5 stroke-gray-600 group-hover:group-enabled:stroke-gray-800 group-disabled:stroke-gray-400" />
        </button>
        <button
          disabled={!nextRoute}
          onClick={() => next()}
          title={`${!!nextRoute ? `Go to ${nextRoute.name} route` : 'Go to next route'}`}
          className="group w-8 h-8 rounded-md cursor-pointer hover:enabled:bg-gray-100 flex items-center justify-center"
        >
          <Redo className="w-5 h-5 stroke-gray-600 group-hover:group-enabled:stroke-gray-800 group-disabled:stroke-gray-400" />
        </button>
      </div>
    </div>
  )
}