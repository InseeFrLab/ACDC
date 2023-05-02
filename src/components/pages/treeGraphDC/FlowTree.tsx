/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useCallback } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  MiniMap,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

type FlowTreeProps = {
  nodes: Node[];
  edges: Edge[];
};

const FlowTree = (props: FlowTreeProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div
      style={{
        width: '90vw',
        height: '70vh',
        border: '1px solid black',
        marginTop: 10,
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        {/* @ts-ignore: Expected false error */}
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowTree;
