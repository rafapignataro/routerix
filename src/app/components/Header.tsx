import { useTab } from "../hooks/use-tab"

export function Header() {
  const { tab, setTab } = useTab();

  return (
    <div className="h-16 mb-4 px-4 bg-white shadow-sm border-b-[1px] rounded-md border-gray-200">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="py-4 font-bold text-2xl">Atlas</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTab('TREE')}
              data-active={tab === 'TREE'}
              className="px-4 py-1 rounded-lg text-md bg-gray-100 hover:bg-gray-200 data-[active=true]:bg-gray-900 data-[active=true]:text-white transition-all duration-200"
            >Tree</button>
            <button
              onClick={() => setTab('GRAPH')}
              data-active={tab === 'GRAPH'}
              className="px-4 py-1 rounded-lg text-md bg-gray-100 hover:bg-gray-200 data-[active=true]:bg-gray-900 data-[active=true]:text-white transition-all duration-200"
            >Graph</button>
          </div>
        </div>
      </div>
    </div>
  )
}