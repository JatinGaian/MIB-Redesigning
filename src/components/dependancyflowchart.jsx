// import React, { useCallback } from 'react';
// import ReactFlow, {
//   Background,
//   Controls,
//   MiniMap,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   ConnectionLineType,
// } from 'reactflow';
// import 'reactflow/dist/style.css';
// import dagre from 'dagre';

// const sprintData = [
//   { id: 'SP1', label: 'Sprint 1', team: 'Core', blockers: true, link: 'https://jira.example.com/SP1' },
//   { id: 'SP2', label: 'Sprint 2', team: 'API', blockers: false, link: 'https://jira.example.com/SP2' },
//   { id: 'SP3', label: 'Sprint 3', team: 'UI', blockers: true, link: 'https://jira.example.com/SP3' },
//   { id: 'SP4', label: 'Sprint 4', team: 'QA', blockers: false, link: 'https://jira.example.com/SP3' },
//   { id: 'SP5', label: 'Sprint 5', team: 'DevOps', blockers: false, link: 'https://jira.example.com/SP5' },
//   { id: 'SP6', label: 'Sprint 6', team: 'UX', blockers: true, link: 'https://jira.example.com/SP3' },
//   { id: 'SP8', label: 'Sprint 8', team: 'Security', blockers: false, link: 'https://jira.example.com/SP8' },
// ];

// const teamColors = {
//   Core: '#607d8b',
//   API: '#03a9f4',
//   UI: '#9c27b0',
//   QA: '#4caf50',
//   DevOps: '#795548',
//   UX: '#ff9800',
//   Security: '#e91e63',
// };

// const nodeWidth = 200;
// const nodeHeight = 100;

// const createNodes = () =>
//   sprintData.map((sprint) => ({
//     id: sprint.id,
//     data: {
//       label: (
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           {sprint.blockers && <span title="Blocker">⚠️</span>}
//           <strong>{sprint.label}</strong>
//           {sprint.link && (
//             <a href={sprint.link} target="_blank" rel="noopener noreferrer" title="Linked Jira Issue">
//               🔗
//             </a>
//           )}
//         </div>
//       ),
//     },
//     style: {
//       background: teamColors[sprint.team],
//       color: '#fff',
//       padding: 10,
//       borderRadius: 8,
//       width: nodeWidth,
//       boxShadow: sprint.blockers
//         ? '0 0 10px rgba(255,0,0,0.6)'
//         : '0 2px 6px rgba(0,0,0,0.2)',
//     },
//     position: { x: 0, y: 0 }, // will be updated by Dagre
//   }));

// const edges = [
//   { id: 'SP1-SP2', source: 'SP1', target: 'SP2', animated: true, type:'' },
//   { id: 'SP1-SP6', source: 'SP1', target: 'SP6', animated: true, type: '' },
//   { id: 'SP1-SP8', source: 'SP1', target: 'SP8', animated: true, type: '' },
//   { id: 'SP3-SP4', source: 'SP3', target: 'SP4', animated: true, type: '' },
// ];

// const getLayoutedElements = (nodes, edges, direction = 'LR') => {
//   const dagreGraph = new dagre.graphlib.Graph();
//   dagreGraph.setDefaultEdgeLabel(() => ({}));
//   dagreGraph.setGraph({ rankdir: direction });

//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
//   });

//   edges.forEach((edge) => {
//     dagreGraph.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(dagreGraph);

//   const isHorizontal = direction === 'LR';

//   const layoutedNodes = nodes.map((node) => {
//     const { x, y } = dagreGraph.node(node.id);
//     return {
//       ...node,
//       position: { x, y },
//       targetPosition: isHorizontal ? 'left' : 'top',
//       sourcePosition: isHorizontal ? 'right' : 'bottom',
//     };
//   });

//   return { nodes: layoutedNodes, edges };
// };

// const DependencyFlowChart = () => {
//   const { nodes, edges: layoutedEdges } = getLayoutedElements(createNodes(), edges, 'LR');
//   const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
//   const [edgesState, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

//   const onConnect = useCallback(
//     (params) =>
//       setEdges((eds) =>
//         addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
//       ),
//     []
//   );

//   return (
//     <div style={{ height: '600px', width: '100%' }}>
//       <ReactFlow
//         nodes={nodesState}
//         edges={edgesState}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         fitView
//         connectionLineType={ConnectionLineType.SmoothStep}
//       >
//         <MiniMap />
//         <Controls />
//         <Background color="#f0f0f0" gap={16} />
//       </ReactFlow>
//     </div>
//   );
// };

// export default DependencyFlowChart;


import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from 'dagre';

// Sprint and styling config
const sprintData = [
  { id: 'SP1', label: 'Sprint 1', team: 'Core', blockers: true, link: 'https://jira.example.com/SP1' },
  { id: 'SP2', label: 'Sprint 2', team: 'API', blockers: false, link: 'https://jira.example.com/SP2' },
  { id: 'SP3', label: 'Sprint 3', team: 'UI', blockers: true, link: 'https://jira.example.com/SP3' },
  { id: 'SP4', label: 'Sprint 4', team: 'QA', blockers: false, link: 'https://jira.example.com/SP4' },
  { id: 'SP5', label: 'Sprint 5', team: 'DevOps', blockers: false, link: 'https://jira.example.com/SP5' },
  { id: 'SP6', label: 'Sprint 6', team: 'UX', blockers: true, link: 'https://jira.example.com/SP6' },
  { id: 'SP8', label: 'Sprint 8', team: 'Security', blockers: false, link: 'https://jira.example.com/SP8' },
];

const teamColors = {
  Core: '#607d8b',
  API: '#03a9f4',
  UI: '#9c27b0',
  QA: '#4caf50',
  DevOps: '#795548',
  UX: '#ff9800',
  Security: '#e91e63',
};

const nodeWidth = 200;
const nodeHeight = 100;

// Helper to calculate age in weeks
const getWeeksPending = (createdAt) => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffMs = now - created;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));
};

// Create sprint cards (nodes)
const createNodes = () =>
  sprintData.map((sprint) => ({
    id: sprint.id,
    data: {
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {sprint.blockers && <span title="Blocker">⚠️</span>}
          <strong>{sprint.label}</strong>
          {sprint.link && (
            <a href={sprint.link} target="_blank" rel="noopener noreferrer" title="Linked Jira Issue">
              🔗
            </a>
          )}
        </div>
      ),
    },
    style: {
      background: teamColors[sprint.team],
      color: '#fff',
      padding: 10,
      borderRadius: 8,
      width: nodeWidth,
      boxShadow: sprint.blockers
        ? '0 0 10px rgba(255,0,0,0.6)'
        : '0 2px 6px rgba(0,0,0,0.2)',
    },
    position: { x: 0, y: 0 },
  }));

// Define sprint dependencies (edges)
const edges = [
  {
    id: 'SP1-SP2',
    source: 'SP1',
    target: 'SP2',
    animated: true,
    type: '',
    createdAt: '2025-06-10',
  },
  {
    id: 'SP1-SP6',
    source: 'SP1',
    target: 'SP6',
    animated: true,
    type: '',
    createdAt: '2025-06-18',
  },
  {
    id: 'SP1-SP8',
    source: 'SP1',
    target: 'SP8',
    animated: true,
    type: '',
    createdAt: '2025-07-02',
  },
  {
    id: 'SP3-SP4',
    source: 'SP3',
    target: 'SP4',
    animated: true,
    type: '',
    createdAt: '2025-06-25',
  },
];

// Position everything using Dagre layout
const getLayoutedElements = (nodes, edges, direction = 'LR') => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction, ranksep: 300 });


  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const isHorizontal = direction === 'LR';

  const layoutedNodes = nodes.map((node) => {
    const { x, y } = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x, y },
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
    };
  });

  const layoutedEdges = edges.map((edge) => ({
    ...edge,
    label: edge.createdAt
      ? `Pending ${getWeeksPending(edge.createdAt)} week(s)`
      : '',
  }));

  return { nodes: layoutedNodes, edges: layoutedEdges };
};

// Main component
const DependencyFlowChart = () => {
  const { nodes, edges: layoutedEdges } = getLayoutedElements(createNodes(), edges, 'LR');
  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  );

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <ReactFlow
        nodes={nodesState}
        edges={edgesState}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <MiniMap />
        <Controls />
        <Background color="#f0f0f0" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default DependencyFlowChart;