import { Route, RouteElement } from "../../types";
import { Icon } from "./Icons";
import { RouteIcon } from "./RouteIcons";

type RouteTreeProps = {
  route: Route;
}

function cn(...args: string[]) {
  return args.join(' ');
}

export function RouteTree({ route }: RouteTreeProps) {
  return (
    <details className={cn(`group/${route.name}`, "w-full rounded-md open:rounded-xl relative")}>
      <summary className="flex flex-col">
        <div className="flex items-center justify-between gap-5 relative">
          <div className="flex items-center gap-1">
            <Icon name="chevronRight" className={cn(
              `group-open/${route.name}:rotate-90`,
              "w-4 h-4 transition-all"
            )} />
            <div className="py-2 px-0 flex items-center justify-center rounded-md">
              <RouteIcon name={route.subType} className="h-4 w-4 stroke-2 text-gray-800" />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm">{route.name}</p>
              <div className="bg-blue-700 px-1 rounded-sm font-bold text-white text-xs">{route.subType}</div>
            </div>
          </div>
          <div className="route-line-helper h-[1px] flex-1 bg-gray-100"></div>
          <p className="text-gray-400 text-sm">{route.path}</p>
        </div>
      </summary>
      <ul className="ml-4">
        {Object.values(route.children).map((element) =>
          <li key={element.id}>
            <RouteTreeElement element={element} />
          </li>
        )}
      </ul>
      <div className={cn(
        `group-open/${route.name}:block`,
        "ident-helper hidden absolute left-1 top-8 w-[1px] h-[calc(100%-32px)] bg-gray-100"
      )} />
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
          <div className="bg-blue-700 px-1 rounded-sm font-bold text-white text-xs">{element.subType}</div>
        </div>
      </div>
      <div className="h-[1px] flex-1 bg-gray-100"></div>
    </div>
  )
}