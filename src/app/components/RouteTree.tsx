import { ChevronRight, MoveRight } from "lucide-react";
import { Route, RouteElement } from "../../types";
import { useRoute } from "../hooks/use-route";
import { RouteIcon } from "./RouteIcons";

type RouteTreeProps = {
  route: Route;
}

export function RouteTree({ route }: RouteTreeProps) {
  const currentRoute = useRoute();

  const isCurrent = currentRoute.route.id === route.id;

  function handleSetCurrentRoute() {
    if (isCurrent) return;

    currentRoute.setRoute(route);
  }

  return (
    <details
      className="w-full relative [&>summary>div>.folder-chevron]:open:rotate-90 [&>.ident-helper]:open:block"
      title={`Navigate to ${route.name} route`}
    >
      <summary
        data-current={isCurrent}
        onClick={handleSetCurrentRoute}
        className="
          flex flex-col pl-4 cursor-pointer h-8
          [&>div>.route-popover]:hover:flex 
          [&>.hover-background]:data-[current=true]:bg-gray-100
          [&>.hover-background]:data-[current=true]:block
          [&>.hover-background]:hover:block
          text-gray-600 data-[current=true]:text-gray-900 data-[current=true]:font-semibold
        "
      >
        <div className="hover-background hidden absolute right-0 bg-gray-50 h-8 w-80"></div>
        <div className="flex items-center gap-1 w-full z-10">
          <ChevronRight className="flex-none w-4 h-4 transition-all folder-chevron" />
          <div className="py-2 px-0 flex items-center justify-center">
            <RouteIcon name={route.subType} className="route-icon h-4 w-4 stroke-2" />
          </div>
          <p className="text-sm text-nowrap text-ellipsis overflow-hidden w-full">{route.name}</p>
          {!isCurrent && (
            <div className="route-popover hidden flex-1 items-end px-2">
              <MoveRight className="size-4 stroke-gray-600" />
            </div>
          )}
        </div>
      </summary>
      <ul className="ml-4">
        {Object.values(route.children).map((element) =>
          <li key={element.id}>
            <RouteTreeElement element={element} />
          </li>
        )}
      </ul>
      <div className="ident-helper hidden absolute left-4 top-8 w-[1px] h-[calc(100%-32px)] bg-gray-200 z-50" />
    </details>
  )
};

interface RouteElementProps {
  element: Route | RouteElement;
}

function RouteTreeElement({ element }: RouteElementProps) {
  if (element.type === 'route') return <RouteTree route={element} />

  return (
    <div className="flex items-center justify-between gap-5 w-full text-gray-600">
      <div className="flex items-center gap-1">
        <div className="w-4"></div>
        <div className="py-2 px-0 flex items-center justify-center">
          <RouteIcon name={element.subType} className="h-4 w-4 stroke-2" />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm">{element.name}</p>
        </div>
      </div>
    </div>
  )
}