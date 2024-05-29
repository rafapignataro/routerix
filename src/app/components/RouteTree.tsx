import { Route, RouteElement } from "../../types";
import { useRoute } from "../hooks/use-route";
import { Icon } from "./Icons";
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
    <details className="w-full rounded-md open:rounded-xl relative [&>summary>div>div>.folder-chevron]:open:rotate-90 [&>.ident-helper]:open:block">
      <summary
        data-current={isCurrent}
        onClick={handleSetCurrentRoute}
        className="flex flex-col hover:bg-gray-100 rounded-md cursor-pointer data-[current=true]:bg-blue-500 data-[current=true]:text-white [&>div>div>div>.route-icon]:data-[current=true]:stroke-white"
      >
        <div className="flex items-center justify-between gap-5 relative">
          <div className="flex items-center gap-1">
            <Icon name="chevronRight" className="w-4 h-4 transition-all folder-chevron" />
            <div className="py-2 px-0 flex items-center justify-center rounded-md">
              <RouteIcon name={route.subType} className="route-icon h-4 w-4 stroke-2 text-gray-800" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm">{route.name}</p>
            </div>
          </div>
        </div>
      </summary>
      <ul className="ml-4">
        {Object.values(route.children).map((element) =>
          <li key={element.id}>
            <RouteTreeElement element={element} />
          </li>
        )}
      </ul>
      <div className="ident-helper hidden absolute left-1 top-8 w-[1px] h-[calc(100%-32px)] bg-gray-100" />
    </details>
  )
};

interface RouteElementProps {
  element: Route | RouteElement;
}

function RouteTreeElement({ element }: RouteElementProps) {
  if (element.type === 'route') return <RouteTree route={element} />

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-1">
        <div className="w-4"></div>
        <div className="py-2 px-0 flex items-center justify-center rounded-md">
          <RouteIcon name={element.subType} className="h-4 w-4 stroke-2 text-gray-800" />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm">{element.name}</p>
        </div>
      </div>
    </div>
  )
}