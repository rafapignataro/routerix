import { Undo, Redo, Search, Download, MoveRight } from 'lucide-react'
import { useRoute } from '../../hooks/use-route';

export function Header() {
  const { route, previous, next, previousRoute, nextRoute } = useRoute();

  return (
    <div className="h-14 flex items-center justify-between bg-white border-b-[1px] border-gray-200">
      <div className="h-full py-2 flex-1 flex items-center justify-center px-4 relative">
        <label htmlFor="search-input" className="flex items-center p-2 gap-2 border-[1px] border-gray-200 rounded-md w-full max-w-80 bg-gray-50">
          <Search className="size-4 text-gray-600" />
          <input id="search-input" className="peer flex-1 text-xs placeholder:text-xs outline-0 text-gray-800 bg-transparent" placeholder="Search route" />
          <div className="hidden peer-focus:block absolute top-full left-1/2 -translate-x-1/2 translate-y-2 rounded-sm p-1 z-50 w-full max-w-[480px] bg-white border-[1px]">
            <div className="w-full">
              <div className="group w-full px-2 py-1 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                <p className="text-sm font-semibold">/long-journey</p>
                -
                <span className="text-xs flex-1 overflow-hidden text-ellipsis">/[locale]/(shop)/eu/long-journey</span>
                <div className="hidden group-hover:block items-end px-2">
                  <MoveRight className="size-4 stroke-gray-600" />
                </div>
              </div>
              <div className="group w-full px-2 py-1 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                <p className="text-sm font-semibold">/long-journey</p>
                -
                <span className="text-xs flex-1 overflow-hidden text-ellipsis">/[locale]/(shop)/eu/long-journey</span>
                <div className="hidden group-hover:block items-end px-2">
                  <MoveRight className="size-4 stroke-gray-600" />
                </div>
              </div>
              <div className="group w-full px-2 py-1 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                <p className="text-sm font-semibold">/long-journey</p>
                -
                <span className="text-xs flex-1 overflow-hidden text-nowrap text-ellipsis">/[locale]/(shop)/eu/long-journey/[locale]/(shop)/eu/long-journey/[locale]/(shop)/eu/long-journey/[locale]/(shop)/eu/long-journey</span>
                <div className="hidden group-hover:block items-end px-2">
                  <MoveRight className="size-4 stroke-gray-600" />
                </div>
              </div>
              <div className="group w-full px-2 py-1 flex items-center gap-2 hover:bg-gray-50 cursor-pointer">
                <p className="text-sm font-semibold">/long-journey</p>
                -
                <span className="text-xs flex-1 overflow-hidden text-ellipsis">/[locale]/(shop)/eu/long-journey</span>
                <div className="hidden group-hover:block items-end px-2">
                  <MoveRight className="size-4 stroke-gray-600" />
                </div>
              </div>
            </div>
          </div>
        </label>
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
