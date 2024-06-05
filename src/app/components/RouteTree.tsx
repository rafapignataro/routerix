import { ChevronRight } from "lucide-react";
import { Route } from "../../types";
import { useRoute } from "../hooks/use-route";

type RouteTreeProps = {
  route: Route;
}

export function RouteTree({ route }: RouteTreeProps) {
  const currentRoute = useRoute();

  const isParent = !!Object.keys(route.routes).length;

  const isCurrent = currentRoute.route.id === route.id;

  function handleSetCurrentRoute() {
    if (isCurrent) return;

    currentRoute.setRoute(route);
  }

  return (
    <details
      className="
        w-full relative
        [&>summary>div>.folder-chevron]:open:rotate-90
        has-[details:open]
      "
      title={`Navigate to ${route.path} route`}
      data-current={isCurrent}
    >
      <summary
        data-current={isCurrent}
        onClick={handleSetCurrentRoute}
        className="
          flex items-center gap-1 w-full relative hover:bg-gray-50 cursor-pointer h-8 text-gray-600
          data-[current=true]:text-gray-900 data-[current=true]:font-semibold
          [&>.guide-line-dot]:data-[current=true]:bg-blue-500
        "
      >
        {/* <div className="hover-background hidden absolute right-0 bg-gray-50 h-8 w-80"></div> */}
        <div className="guide-line-dot z-10 h-2 w-2 mr-2 rounded-full bg-gray-400 *:bg-gray-400 flex-none relative" />
        {route.path !== '/' && (
          <>
            <div className="guide-line-horizontal h-[1px] w-3 bg-gray-400 absolute top-1/2 -translate-y-1/2 right-full" />
            <div className="guide-line-vertical h-[36px] w-[1px] bg-gray-400 absolute -left-3 top-1/2 -translate-y-full right-full" />
          </>
        )}
        <p className="text-sm text-nowrap text-ellipsis overflow-hidden w-full">{route.path}</p>
        {isParent && (
          <div className="flex-none pr-2">
            <ChevronRight className="folder-chevron h-4 w-4 flex-none transition-all" />
          </div>
        )}
      </summary>
      {isParent && (
        <ul className="pl-4 relative">
          {(Object.keys(route.routes).length > 1) && (
            <div className="ident-helper h-full w-[1px] bg-gray-400 absolute left-1 -top-4"></div>
          )}
          {Object.values(route.routes).map((subRoute) =>
            <li key={subRoute.id}>
              <RouteTree route={subRoute} />
            </li>
          )}
        </ul>
      )}
    </details>
  )
};