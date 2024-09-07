'use client'

import { useTheme } from 'next-themes'; // Add this import
import {
    ReactFlow,
    addEdge,
    useNodesState,
    useEdgesState,
    MarkerType,
} from '@xyflow/react';
import React, { useCallback } from 'react';
import Layout from '@/components/layouts/MainLayout';
import { getStraightPath, useInternalNode } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '@/components/reactflow/style.css';
import { Handle, Position, useConnection } from '@xyflow/react';
import { getEdgeParams } from '@/components/reactflow/utils';

function FloatingEdge({ id, source, target, markerEnd, style }: { id: string, source: string, target: string, markerEnd: string, style: React.CSSProperties }) {
    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);

    if (!sourceNode || !targetNode) {
        return null;
    }

    const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

    const [edgePath] = getStraightPath({
        sourceX: sx,
        sourceY: sy,
        targetX: tx,
        targetY: ty,
    });

    return (
        <path
            id={id}
            className="react-flow__edge-path"
            d={edgePath}
            markerEnd={markerEnd}
            style={style}
        />
    );
}


export function CustomNode({ id, data }: { id: string, data: any }) {
    const connection = useConnection();
    const { theme } = useTheme();

    const isTarget = connection.inProgress && connection.fromNode.id !== id;

    return (
        <div className="customNode">
            <div
                className="px-3 py-2 rounded-md"
                style={{
                    color: theme === 'dark' ? 'white' : 'black',
                    borderStyle: isTarget ? 'dashed' : 'solid',
                    backgroundColor: isTarget
                        ? theme === 'dark' ? '#4a1d35' : '#ffcce3'
                        : theme === 'dark' ? '#1e293b' : '#ccd9f6',
                }}
            >
                {/* If handles are conditionally rendered and not present initially, you need to update the node internals https://reactflow.dev/docs/api/hooks/use-update-node-internals/ */}
                {/* In this case we don't need to use useUpdateNodeInternals, since !isConnecting is true at the beginning and all handles are rendered initially. */}
                {!connection.inProgress && (
                    <Handle
                        className="customHandle"
                        position={Position.Right}
                        type="source"
                    />
                )}
                {/* We want to disable the target handle, if the connection was started from this node */}
                {(!connection.inProgress || isTarget) && (
                    <Handle className="customHandle" position={Position.Left} type="target" isConnectableStart={false} />
                )}
                <div className='mb-2 font-bold text-md text-end'>{isTarget ? 'Connect here' : data?.label}</div>

                <div className="flex items-center justify-between gap-2">
                    <label className="text-sm font-normal" htmlFor="prompt">Input</label>
                    <input id="prompt" type="text" className="w-full p-1 rounded-md" />
                </div>
            </div>
        </div>
    );
}

function CustomConnectionLine({ fromX, fromY, toX, toY, connectionLineStyle }: { fromX: number, fromY: number, toX: number, toY: number, connectionLineStyle: React.CSSProperties }) {
    const [edgePath] = getStraightPath({
        sourceX: fromX,
        sourceY: fromY,
        targetX: toX,
        targetY: toY,
    });

    return (
        <g>
            <path style={connectionLineStyle} fill="none" d={edgePath} />
            <circle
                cx={toX}
                cy={toY}
                fill="black"
                r={3}
                stroke="black"
                strokeWidth={1.5}
            />
        </g>
    );
}



const nodeTypes = {
    custom: CustomNode,
};

const edgeTypes = {
    floating: FloatingEdge,
};


const EasyConnectExample = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState([
        {
            id: '1',
            type: 'custom',
            position: { x: 0, y: 0 },
            data: {
                label: 'News Agent',
            },
        },
        {
            id: '2',
            type: 'custom',
            position: { x: 250, y: 320 },
            data: {
                label: 'Crypto Agent',
            },
        },
        {
            id: '3',
            type: 'custom',
            position: { x: 40, y: 300 },
            data: {
                label: 'Social Agent',
            },
        },

    ] as any[]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([] as any[]);
    const { theme } = useTheme(); // Add this line

    const onConnect = useCallback(
        (params: any) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );


    const defaultEdgeOptions = {
        style: { strokeWidth: 2, stroke: theme === 'dark' ? 'white' : 'black' },
        type: 'floating',
        markerEnd: {
            type: MarkerType.ArrowClosed,
            color: theme === 'dark' ? 'white' : 'black',
        },
    };

    const { bg, stroke } = theme === 'dark'
        ? { bg: 'bg-zinc-900', stroke: 'white' }
        : { bg: 'bg-white', stroke: 'black' };; // Add this line

    return (
        <Layout>
            <div className={`grid grid-row-2 gap-2`} >
                <div className="flex flex-row gap-2 justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">Create a new workflow</h1>
                        <p>Select an agent and create a workflow to automate your tasks.</p>
                    </div>
                    <div className='flex flex-col items-end justify-end gap-2'> <div className="grid grid-cols-3 text-center gap-2">
                        <button onClick={() => {
                            setNodes([...nodes, {
                                id: '4',
                                type: 'custom',
                                position: { x: 0, y: 0 },
                                data: {
                                    label: 'News Agent',
                                },
                            }])
                        }} className="text-md text-nowrap bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-md p-2 font-bold">News Agent</button>
                        <button onClick={() => {
                            setNodes([...nodes, {
                                id: '5',
                                type: 'custom',
                                position: { x: 0, y: 0 },
                                data: {
                                    label: 'Crypto Agent',
                                },
                            }])
                        }} className="text-md text-nowrap bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-md p-2 font-bold">Crypto Agent</button>
                        <button onClick={() => {
                            setNodes([...nodes, {
                                id: '6',
                                type: 'custom',
                                position: { x: 0, y: 0 },
                                data: {
                                    label: 'Social Agent',
                                },
                            }])
                        }} className="text-md text-nowrap bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-md p-2 font-bold">Social Agent</button>
                    </div>
                        <div className="flex flex-row gap-2 w-full">
                            <button className="flex items-center justify-between text-md text-nowrap w-full dark:border-orange-500 dark:text-zinc-100 border hover:bg-orange-500  border-orange-500 rounded-md p-2 font-bold transition ease-in-out dark:hover:text-zinc-900">
                                Start Flowlet <div><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
                                </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${bg} rounded-lg transition-colors duration-200`} style={{ height: '55vh', width: '100%' }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes as any}
                        defaultEdgeOptions={{
                            ...defaultEdgeOptions,
                            style: { ...defaultEdgeOptions.style, stroke },
                        }}
                        connectionLineComponent={CustomConnectionLine as any}
                        connectionLineStyle={{
                            strokeWidth: 2,
                            stroke: theme === 'dark' ? 'white' : 'black'
                        }}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default EasyConnectExample;