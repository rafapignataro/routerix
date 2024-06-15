import { Undo, Redo, Search, Download, MoveRight } from 'lucide-react'
import { useRoute } from '../../hooks/use-route';
import { RouteSearch } from './RouteSearch';

export function Header() {
  const { route, previous, next, previousRoute, nextRoute } = useRoute();

  return (
    <div className="h-14 flex items-center justify-between bg-white border-b-[1px] border-gray-200">
      <div className="h-full py-2 flex-1 flex items-center justify-center px-4 relative">
        <RouteSearch />
      </div>
      <div className="h-full flex items-center px-4 gap-1 border-l-[1px] border-gray-200 w-72">
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
        <div className="h-full w-[1px] mx-2 bg-gray-200"></div>
        <button
          onClick={() => { }}
          title="Download app diagram"
          className="group w-8 h-8 rounded-md cursor-pointer hover:enabled:bg-gray-100 flex items-center justify-center"
        >
          <Download className="w-5 h-5 stroke-gray-600 group-hover:group-enabled:stroke-gray-800 group-disabled:stroke-gray-400" />
        </button>
      </div>
    </div>
  )
}
