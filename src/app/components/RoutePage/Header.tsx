import { RouteSearch } from './RouteSearch';
import { DownloadGraphAction } from './actions/DownloadGraphAction';
import { NextRouteAction } from './actions/NextRouteAction';
import { PreviousRouteAction } from './actions/PreviousRouteAction';

export function Header() {

  return (
    <div className="h-14 flex items-center justify-between bg-white border-b-[1px] border-gray-200">
      <div className="h-full py-2 flex-1 flex items-center justify-center px-4 relative">
        <RouteSearch />
      </div>
      <div className="h-full flex items-center px-4 gap-1 border-l-[1px] border-gray-200 w-72">
        <PreviousRouteAction />
        <NextRouteAction />
        <div className="h-full w-[1px] mx-2 bg-gray-200"></div>
        <DownloadGraphAction />
      </div>
    </div>
  )
}
