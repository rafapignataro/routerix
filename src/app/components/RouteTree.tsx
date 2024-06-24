import { ChevronRight } from "lucide-react";
import { Route } from "../../lib/core/types";
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
      id={`route-tree-${route.id}`}
      className="
        route-parent
        w-full relative
        [&>summary_.folder-chevron]:open:rotate-90
        [&:not(:last-child)>.route-ident]:open:block
      "
      title={`Navigate to ${route.path} route`}
      data-current={isCurrent}
    >
      <summary
        data-current={isCurrent}
        onClick={handleSetCurrentRoute}
        className="
          flex items-center gap-1 w-full hover:bg-gray-50 cursor-pointer h-8 text-gray-600
          data-[current=true]:text-gray-800 data-[current=true]:font-semibold
          [&>.guide-line-dot]:data-[current=true]:bg-blue-500
        "
      >
        <div className="guide-line-dot z-10 h-2 w-2 mr-2 rounded-full bg-gray-400 *:bg-gray-400 flex-none relative" />

        <div className="guide-line-horizontal h-[1px] w-3 bg-gray-400 absolute top-4 -translate-y-1/2 right-full" />

        <div className="guide-line-vertical h-[36px] w-[1px] bg-gray-400 absolute top-0 left-0 -translate-x-3 -translate-y-5" />

        <p className="text-sm text-nowrap text-ellipsis overflow-hidden w-full">{route.path}</p>

        {isParent && (
          <div className="flex-none mr-2" onClick={() => { }}>
            <ChevronRight className="folder-chevron h-4 w-4 flex-none transition-all" />
          </div>
        )}
      </summary>
      {isParent && (
        <>
          <div className="route-ident hidden h-full w-[1px] bg-gray-400 absolute -left-3 -top-4"></div>
          <div className="route-children pl-4 relative">
            {Object.values(route.routes).map((subRoute) => (
              <RouteTree key={subRoute.id} route={subRoute} />
            ))}
          </div>
        </>
      )}
    </details>
  )
};