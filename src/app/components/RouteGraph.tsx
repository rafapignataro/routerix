import * as vis from "vis-network/standalone/esm";
import { Route } from "../../types";
import { useEffect, useMemo, useState } from "react";

type RouteGraphProps = {
  route: Route;
}

interface GraphNode {
  id: number;
  label: string;
}

interface GraphEdge {
  id: number;
  from: number;
  to: number;
}

function getRoutesNodesAndEdges(routes: Route, nodes: GraphNode[] = [], edges: GraphEdge[] = [], x = 0, y = 0, level = 1) {
  const parentNodeId = nodes.length + 1;

  nodes.push({
    id: parentNodeId,
    label: routes.name,
  });

  const childXIncrement = 200;
  const childYIncrement = 50;
  const children = Object.values(routes.children);
  const numChildren = children.length;
  const startX = x - ((numChildren - 1) * childXIncrement) / 2;

  children.forEach((child, index) => {
    if (child.type === 'route') {
      const childX = startX + index * childXIncrement;
      const childY = y + childYIncrement;

      edges.push({ id: edges.length + 1, from: parentNodeId, to: nodes.length + 1 });

      getRoutesNodesAndEdges(child, nodes, edges, childX, childY, level + 1);
    }
  });

  return { nodes, edges };
}

type GraphDirection = 'UD' | 'DU' | 'LR' | 'RL'

export function RouteGraph({ route }: RouteGraphProps) {
  const [graphDirection, setGraphDirection] = useState<GraphDirection>('UD');

  const { nodes, edges } = useMemo(() => getRoutesNodesAndEdges(route), [route.id]);

  function renderGraph(direction: GraphDirection) {
    const visNodes = new vis.DataSet(nodes) as vis.DataSetNodes;

    const visEdges = new vis.DataSet(edges) as vis.DataSetEdges;

    new vis.Network(
      document.getElementById("vis-container")!,
      { nodes: visNodes, edges: visEdges },
      {
        edges: {
          smooth: {
            enabled: true,
            type: "cubicBezier",
            forceDirection:
              direction == "UD" || direction == "DU"
                ? "vertical"
                : "horizontal",
            roundness: 0.4,
          },
        },
        layout: {
          hierarchical: {
            direction: direction,
            sortMethod: 'directed'
          },
        },
        physics: {
          hierarchicalRepulsion: {
            avoidOverlap: 1,
          },
        },
        nodes: {
          color: '#030712',
          font: { color: '#fff' },
        },

      }
    );
  }

  function handleChangeGraphDirection(direction: GraphDirection) {
    setGraphDirection(direction);

    renderGraph(direction);
  }

  useEffect(() => {
    renderGraph(graphDirection);
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => handleChangeGraphDirection('UD')}
          data-active={graphDirection === 'UD'}
          className="px-4 py-1 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 data-[active=true]:bg-gray-800 data-[active=true]:text-white transition-all duration-200"
        >UD</button>
        <button
          onClick={() => handleChangeGraphDirection('DU')}
          data-active={graphDirection === 'DU'}
          className="px-4 py-1 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 data-[active=true]:bg-gray-800 data-[active=true]:text-white transition-all duration-200"
        >DU</button>
        <button
          onClick={() => handleChangeGraphDirection('LR')}
          data-active={graphDirection === 'LR'}
          className="px-4 py-1 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 data-[active=true]:bg-gray-800 data-[active=true]:text-white transition-all duration-200"
        >LR</button>
        <button
          onClick={() => handleChangeGraphDirection('RL')}
          data-active={graphDirection === 'RL'}
          className="px-4 py-1 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 data-[active=true]:bg-gray-800 data-[active=true]:text-white transition-all duration-200"
        >RL</button>
      </div>
      <div id="vis-container" className='w-full h-[75dvh]'></div>
    </div>
  )
};