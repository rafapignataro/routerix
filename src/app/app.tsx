import { useSchema } from './hooks/use-schema';
import { Header } from './components/Header';
import { RouteTree } from './components/RouteTree';
import { useTab } from './hooks/use-tab';
import { RouteGraph } from './components/RouteGraph';

export function App() {
  const { tab } = useTab();

  return (
    <div>
      <Header />
      {tab === 'TREE' && <TreeTab />}
      {tab === 'GRAPH' && <GraphTab />}
    </div>
  );
};

function TreeTab() {
  const schema = useSchema();

  return (
    <div className="px-4 pb-10 ">
      <div className="max-w-screen-xl mx-auto border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Routes Tree</h2>
        <div className="bg-white shadow-md p-2 border-[1px] rounded-md border-gray-200">
          <RouteTree route={schema.routes} />
        </div>
      </div>
    </div>
  )
}

function GraphTab() {
  const schema = useSchema();

  return (
    <div className="px-4 pb-10 ">
      <div className="max-w-screen-xl mx-auto border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Routes Graph</h2>
        <div className="bg-white shadow-md p-2 border-[1px] rounded-md border-gray-200">
          {/* <RouteGraph route={schema.routes} /> */}
          <div className="h-[70dvh]">
            <RouteGraph route={schema.routes} />
          </div>
        </div>
      </div>
    </div>
  )
}
