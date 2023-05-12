/* eslint-disable @typescript-eslint/no-unsafe-argument */

import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
} from 'reactflow';
import { DataCollection } from '@/lib/model/dataCollection';
import BottomVisualizationBar from './ActionBar';
import 'reactflow/dist/style.css';

type FlowTreeProps = {
  nodes: Node[];
  edges: Edge[];
  dataCollection: DataCollection;
};

const FlowTree = (props: FlowTreeProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const proOptions = { hideAttribution: true };
  useEffect(() => {
    console.log('Node updated');
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);
  return (
    <>
      <div
        style={{
          width: '90vw',
          height: '75vh',
          border: '1px solid black',
          marginTop: '1.5rem',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          proOptions={proOptions}
          fitView
        >
          <Controls />
          {/* @ts-ignore: Expected false error */}
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      <BottomVisualizationBar
        handleReset={() => {}}
        dataCollection={props.dataCollection}
        nodes={nodes}
        setNodes={setNodes}
        edges={edges}
        setEdges={setEdges}
      />
    </>
  );
};

export default FlowTree;
