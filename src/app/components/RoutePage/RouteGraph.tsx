import { useCallback, useMemo } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Connection,
  Position,
  useReactFlow,
  useStoreApi,
  Handle,
  NodeProps,
} from 'reactflow';
import dagre from 'dagre';

import { Route } from '../../../types';
import { useRoute } from '../../hooks/use-route';
import { RouteIcon } from '../RouteIcons';
import { ArrowDown, ArrowRight } from 'lucide-react';

import 'reactflow/dist/style.css';

const NODE_WIDTH = 172;
const NODE_HEIGHT = 36;

function getRandomColor() {
  const colors = ['#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#f1c40f', '#e67e22', '#e74c3c'];

  const colorIndex = Math.floor(Math.random() * colors.length);

  return colors[colorIndex]!;
}

function getNodesAndEdges(
  routes: Route,
  nodes: Node[] = [],
  edges: Edge[] = [],
  parent?: { id: string, color: string },
  level = 0
) {
  const nodeId = String(nodes.length + 1);

  const color = !parent ? '#1d4ed8' : level > 1 ? parent.color : getRandomColor();

  nodes.push({
    id: nodeId,
    type: !parent ? 'rootRoute' : 'route',
    data: routes,
    position: { x: 0, y: 0 },
    className: 'font-bold border-2 rounded-sm',
    style: { borderColor: color }
  });

  const children = Object.values(routes.children);

  children.forEach(child => {
    if (child.type !== 'route') return;

    const from = nodeId;
    const to = String(nodes.length + 1);

    edges.push({
      id: `e${from}${to}`,
      source: from,
      target: to,
      type: 'smoothstep',
      animated: true,
      style: {
        stroke: parent ? color : 'black'
      }
    });

    getNodesAndEdges(child, nodes, edges, { id: nodeId, color }, level + 1);
  });

  return { nodes, edges };
}

function getLayoutedNodesAndEdges(nodes: Node[], edges: Edge[], direction = 'TB') {
  const isHorizontal = direction === 'LR';

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({
    rankdir: direction, // Direction for rank nodes. Can be TB, BT, LR, or RL, where T = top, B = bottom, L = left, and R = right.
    align: undefined, // Alignment for rank nodes. Can be UL, UR, DL, or DR, where U = up, D = down, L = left, and R = right.
    nodesep: 50, // Number of pixels that separate nodes horizontally in the layout.
    edgesep: 10, // Number of pixels that separate edges horizontally in the layout.
    ranksep: 250, // Number of pixels between each rank in the layout.
    marginx: 0, // Number of pixels to use as a margin around the left and right of the graph.
    marginy: 0, // Number of pixels to use as a margin around the top and bottom of the graph.
    acyclicer: undefined, // If set to greedy, uses a greedy heuristic for finding a feedback arc set for a graph. A feedback arc set is a set of edges that can be removed to make a graph acyclic.
    ranker: 'network-simplex', // Type of algorithm to assigns a rank to each node in the input graph. Possible values: network-simplex, tight-tree or longest-path
  });

  nodes.forEach((node) => dagreGraph.setNode(node.id, {
    width: NODE_WIDTH,
    height: NODE_HEIGHT,
  }));

  edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    node.position = {
      x: nodeWithPosition.x - NODE_WIDTH / 2,
      y: nodeWithPosition.y - NODE_HEIGHT / 2,
    };

    return node;
  });

  return { nodes, edges };
};

export type GraphDirection = 'TB' | 'BT' | 'LR' | 'RL';

interface RouteGraphProps {
}

export function RouteGraph({ }: RouteGraphProps) {
  const { route, setRoute } = useRoute();

  const layouted = useMemo(() => {

    const { nodes, edges } = getNodesAndEdges(route);

    const layouted = getLayoutedNodesAndEdges(nodes, edges, 'LR');

    return layouted;
  }, [route.id]);

  const [nodes, setNodes, onNodesChange] = useNodesState(layouted.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layouted.edges);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  );

  const onLayout = useCallback(
    (direction: GraphDirection) => {
      const { nodes, edges } = getNodesAndEdges(route);

      const layouted = getLayoutedNodesAndEdges(nodes, edges, direction);

      setNodes([...layouted.nodes]);
      setEdges([...layouted.edges]);
    },
    [route.id, nodes, edges]
  );

  const handleClickNode = useCallback((node: Node<Route>) => {
    const isCurrent = node.data.id === route.id;

    if (isCurrent) return;

    setRoute(node.data);
  }, [route.id]);

  const nodeTypes = useMemo(() => ({
    rootRoute: RouteRootNode,
    route: RouteNode
  }), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={(_, node) => handleClickNode(node)}
      onConnect={onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      fitView
      minZoom={0}
      nodeTypes={nodeTypes}
    >
    </ReactFlow>
  );
};

interface RouteGraphPanelProps {
  onDirection: (direction: GraphDirection) => void;
}

function RouteGraphPanel({ onDirection }: RouteGraphPanelProps) {
  const store = useStoreApi();
  const { setCenter } = useReactFlow();

  const focusNode = () => {
    const { nodeInternals } = store.getState();

    const rootNode = [...nodeInternals.values()][0]!;

    const zoom = 0.5;

    setCenter(rootNode.position.x, rootNode.position.y, { zoom, duration: 1000 });
  };

  function handleDescription(dir: GraphDirection) {
    onDirection(dir);
    setTimeout(() => focusNode(), 0)
  }

  return (
    <Panel position="top-right" className="bg-white shadow-lg m-1 p-2 border-[1px] rounded-md border-gray-200 w-48">
      <p className="font-bold text-gray-800 text-right">Controls</p>
      <div className="h-[1px] w-full bg-gray-100 mb-2"></div>
      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-800 text-right">Direction</p>
          <div className="flex gap-2 items-center justify-end">
            <button
              onClick={() => handleDescription('TB')}
              className="p-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 data-[active=true]:bg-gray-900 data-[active=true]:text-white transition-all duration-200"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDescription('LR')}
              className="p-2 rounded-lg text-sm bg-gray-100 hover:bg-gray-200 data-[active=true]:bg-gray-900 data-[active=true]:text-white transition-all duration-200"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Panel>
  )
}

function RouteNode(node: NodeProps<Route>) {
  const route = node.data;

  return (
    <>

      <div className="group flex items-center px-4 py-3 gap-4 text-gray-700 relative bg-gray-50 hover:bg-gray-200/50">
        <RouteIcon name={route.subType} />
        <p>{route.name}</p>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

function RouteRootNode(node: NodeProps<Route>) {
  const route = node.data;

  return (
    <>
      <div className="group flex items-center px-4 py-3 gap-4 bg-blue-500 text-white">
        <RouteIcon name={route.subType} />
        <p>{route.name}</p>
      </div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}