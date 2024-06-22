import { Search, MoveRight, SearchX } from "lucide-react";
import { useSchema } from "../../hooks/use-schema";
import { ChangeEvent, useState } from "react";
import { useRoute } from "../../hooks/use-route";
import { Route } from "../../../types";

export function RouteSearch() {
  const { list } = useSchema();
  const { route: currentRoute, setRoute } = useRoute();

  const [search, setSearch] = useState('');

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  function handleSelectRoute(route: Route) {
    setRoute(route)
  }

  const filteredList = list.filter(route =>
    route.id.includes(search) ||
    route.name.includes(search) ||
    route.type.includes(search) ||
    route.path.includes(search) ||
    route.fullPath.includes(search)
  );

  return (
    <label htmlFor="search-input" className="flex items-center p-2 gap-2 border-[1px] border-gray-200 rounded-md w-full max-w-[480px] bg-gray-50">
      <Search className="size-4 text-gray-600" />
      <input
        id="search-input"
        className="peer flex-1 text-xs placeholder:text-xs outline-0 text-gray-800 bg-transparent"
        placeholder="Search route"
        value={search}
        onChange={handleSearch}
      />
      <div className="hidden peer-focus:block absolute top-full left-1/2 -translate-x-1/2 translate-y-2 rounded-md p-1 z-50 w-full max-w-[480px] max-h-[240px] overflow-y-auto bg-white border-[1px]">
        <div className="w-full">
          {filteredList.map((route) => (
            <div
              key={route.id}
              onMouseDown={() => handleSelectRoute(route)}
              className="group w-full px-2 py-1 flex items-center gap-1 hover:bg-gray-50 cursor-pointer"
              data-current={route.id === currentRoute.id}
            >
              <div data-current className="z-10 h-2 w-2 mr-2 rounded-full bg-gray-400 group-data-[current=true]:bg-blue-500 flex-none relative" />
              <p className="text-sm font-semibold">{route.path}</p>
              -
              <span className="text-gray-600  text-xs flex-1 overflow-hidden text-ellipsis text-nowrap">{route.fullPath}</span>
              <div className="hidden group-hover:block items-end px-2">
                <MoveRight className="size-4 stroke-gray-600" />
              </div>
            </div>
          ))}
          {!filteredList.length && (
            <div className="w-full px-2 py-1 flex items-center gap-3">
              <SearchX className="size-4 text-gray-600" />
              <p className="text-sm text-gray-600">No routes found</p>
            </div>
          )}
        </div>
      </div>
    </label>
  )
}