'use client'

import {
    ReactFlow,
    addEdge,
    useNodesState,
    useEdgesState,
    MarkerType,
} from '@xyflow/react'; import React, { useCallback } from 'react';

import CustomNode from '@/components/reactflow/CustomNode';
import FloatingEdge from '@/components/reactflow/FloatingEdge';
import CustomConnectionLine from '@/components/reactflow/CustomConnectionLine';

import '@xyflow/react/dist/style.css';
import '@/components/reactflow/style.css';

const initialNodes: any[] = [
    {
        id: '1',
        type: 'custom',
        position: { x: 0, y: 0 },
    },
    {
        id: '2',
        type: 'custom',
        position: { x: 250, y: 320 },
    },
    {
        id: '3',
        type: 'custom',
        position: { x: 40, y: 300 },
    },
    {
        id: '4',
        type: 'custom',
        position: { x: 300, y: 0 },
    },
];

const initialEdges: any = [];

const connectionLineStyle = {
    strokeWidth: 3,
    stroke: 'black',
};

const nodeTypes = {
    custom: CustomNode,
};

const edgeTypes = {
    floating: FloatingEdge,
};

const defaultEdgeOptions = {
    style: { strokeWidth: 3, stroke: 'black' },
    type: 'floating',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'black',
    },
};

const EasyConnectExample = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div className='container mx-auto bg-zinc-200' style={{ height: '65vh', width: '100vw' }}>

            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes as any}
                defaultEdgeOptions={defaultEdgeOptions}
                connectionLineComponent={CustomConnectionLine as any}
                connectionLineStyle={connectionLineStyle}
            />
        </div>
    );
};

export default EasyConnectExample;