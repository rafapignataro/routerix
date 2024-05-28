import { useState } from 'react';

import { useSchema } from './use-schema';
import { Header } from './components/Header';
import { RouteTree } from './components/RouteTree';
import { RouteGraph } from './components/RouteGraph';

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

  return (
    <div className="px-4">
      <div className="max-w-screen-xl mx-auto border-gray-200 py-3">
        <RouteGraph route={schema.routes} />
      </div>
    </div>
  )
}
