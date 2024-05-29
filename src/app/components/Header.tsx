import { useRoute } from "../hooks/use-route";

export function Header() {
  const { route } = useRoute();

  return (
    <div className="h-16 px-4 flex items-center bg-white shadow-sm border-b-[1px] border-gray-200">
      <div className="flex items-stretch gap-6">
        <div className="">
          <span className="text-gray-400 text-sm">Route</span>
          <h3 className="text-xl font-bold">{route.path}</h3>
        </div>
        <div className="space-y-2">
          <span className="text-gray-400 text-sm">Type</span>
          <div className="bg-blue-700 px-1 rounded-sm font-bold text-white text-xs">
            {route.subType}
          </div>
        </div>
      </div>
    </div>
  )
}