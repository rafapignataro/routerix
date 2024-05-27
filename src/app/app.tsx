import { useEffect, useState } from 'react';

import { useSchema } from './use-schema';
import { Header } from './components/Header';
import * as vis from "vis-network/standalone/esm";
import { RouteTree } from './components/RouteTree';

export function App() {
  const [tab, setTab] = useState<'tree' | 'graph'>('tree');

  return (
    <div>
      <Header />
      <div className="px-4">
        <div className="max-w-screen-xl mx-auto border-gray-200 py-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTab('tree')}
              data-active={tab === 'tree'}
              className="px-4 py-2 rounded-lg text-md bg-gray-100 hover:bg-gray-200 data-[active=true]:bg-gray-800 data-[active=true]:text-white transition-all duration-200"
            >Tree</button>
            <button
              onClick={() => setTab('graph')}
              data-active={tab === 'graph'}
              className="px-4 py-2 rounded-lg text-md bg-gray-100 hover:bg-gray-200 data-[active=true]:bg-gray-800 data-[active=true]:text-white transition-all duration-200"
            >Graph</button>
          </div>
        </div>
      </div>
      {tab === 'tree' && <TreeTab />}
      {tab === 'graph' && <GraphTab />}
    </div>
  );
};

function TreeTab() {
  const schema = useSchema();

  return (
    <div className="px-4">
      <div className="max-w-screen-xl mx-auto border-gray-200 py-3">
        <RouteTree route={schema.routes} />
      </div>
    </div>
  )
}

function GraphTab() {
  const schema = useSchema();

  useEffect(() => {
    const nodes = new vis.DataSet([
      { id: 1, label: "Node 1", x: 0, y: 0 },
      { id: 2, label: "Node 2", x: 100, y: -50 },
      { id: 3, label: "Node 3", x: 100, y: 50 },
      { id: 4, label: "Node 4", x: 200, y: -80 },
      { id: 5, label: "Node 5", x: 200, y: -20 },
      { id: 6, label: "Node 6", x: 200, y: 20 },
    ]) as vis.DataSetNodes;

    const edges = new vis.DataSet([
      { id: 1, from: 1, to: 2 },
      { id: 2, from: 1, to: 3 },
      { id: 3, from: 2, to: 4 },
      { id: 4, from: 2, to: 5 },
      { id: 5, from: 3, to: 6 },
    ]) as vis.DataSetEdges;

    new vis.Network(
      document.getElementById("vis-container")!,
      { nodes, edges },
      { physics: false, }
    );
  }, []);

  return (
    <div className="px-4">
      <div className="max-w-screen-xl mx-auto border-gray-200 py-3">
        <div id="vis-container" className='w-full h-[50dvh]'></div>
      </div>
    </div>
  )
}
