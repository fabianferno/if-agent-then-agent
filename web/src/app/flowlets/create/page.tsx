'use client';

import { useTheme } from 'next-themes'; // Add this import
import {
    ReactFlow,
    addEdge,
    useNodesState,
    useEdgesState,
    MarkerType,
} from '@xyflow/react';
import React, { useCallback } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { getStraightPath, useInternalNode } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import '@/components/reactflow/style.css';
import { Handle, Position, useConnection } from '@xyflow/react';
import { getEdgeParams } from '@/components/reactflow/utils';
import Link from 'next/link';
import axios from 'axios';
import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';


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
    const [flowletName, setFlowletName] = useState('');
    const { address } = useAccount();

    const [edges, setEdges, onEdgesChange] = useEdgesState([] as any[]);
    const { theme } = useTheme(); // Add this line



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
        ? { bg: '', stroke: 'white' }
        : { bg: '', stroke: 'black' };; // Add this line

    function addNode(data: any) {
        setNodes([...nodes, {
            id: nodes.length + "",
            type: 'custom',
            position: { x: 0, y: 0 },
            data,
        }]);
    }

    function parseFlowletFromConnections() {
        const connections = edges.map((edge) => {
            return {
                from: edge.source,
                to: edge.target,
            }
        })
        return connections
    }


    async function saveFlowlet() {
        console.log("Saving flowlet:", nodes);
        const response = await axios.post('/api/attest', {
            data: {
                name: "My Flowlet",
                createdBy: address,
                flowlet: parseFlowletFromConnections(),
            },
            indexingValue: address
        });

        console.log("Attestation response:", response);
    }

    return (
        <MainLayout>
            <div className={`flex flex-col w-[50vw]`} >
                <div className="flex flex-row justify-between items-start mb-6 w-full pb-3 rounded-lg border-b border-zinc-700">
                    <div className='flex flex-col gap-4'>
                        <div className='mb-6'>
                            <h1 className="text-2xl font-bold">Create a new workflow</h1>
                            <p>Select an agent and create a workflow to automate your tasks.</p>
                        </div>
                        <div className="flex text-center gap-2 mr-5">
                            <button onClick={() => {
                                addNode({
                                    label: 'News Agent',
                                })
                            }} className="text-md text-nowrap bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-md p-2 font-bold">
                                News Agent 📰
                            </button>
                            <button onClick={() => {
                                addNode({
                                    label: 'Crypto Agent',
                                })
                            }} className="text-md text-nowrap bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-md p-2 font-bold">
                                Crypto Agent ⛓️
                            </button>
                            <button onClick={() => {
                                addNode({
                                    label: 'Social Agent',
                                })
                            }} className="text-md text-nowrap bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-md p-2 font-bold">
                                Social Agent 💬
                            </button>
                            <Link href="https://github.com/fabianferno/if-agent-then-agent/blob/main/contracts/AgentTemplate.sol" target='_blank' className="text-md text-nowrap bg-zinc-800 dark:border-zinc-200 border text-white dark:text-zinc-100 rounded-md p-2 font-bold">
                                Create Agent +
                            </Link>
                        </div>
                    </div>
                    <div className='flex w-[30%] flex-col items-between justify-between gap-2'>
                        <div className="flex items-center justify-between w-full gap-2 mr-5">
                            <button onClick={() => setNodes([])} className="flex-1 text-md text-nowrap bg-zinc-700 dark:bg-zinc-600 text-white rounded-md p-2 font-bold hover:bg-zinc-600 dark:hover:bg-zinc-700 transition ease-in-out">
                                Reset flowlet
                            </button>
                            <button onClick={() => {
                                // Implement beautify logic here 
                            }} className="flex-1 text-md text-nowrap bg-zinc-800 dark:bg-zinc-700 text-white rounded-md p-2 font-bold hover:bg-zinc-700 dark:hover:bg-zinc-800 transition ease-in-out">
                                Beautify
                            </button>
                        </div>
                        <div className='flex flex-col items-center justify-between gap-2'>
                            <input type="text" placeholder="Flowlet name" className="flex w-full text-md text-nowrap bg-zinc-700 dark:bg-zinc-600 text-white rounded-md p-2 font-bold hover:bg-zinc-600 dark:hover:bg-zinc-700 transition ease-in-out" />
                            <button onClick={saveFlowlet} className="flex items-center text-zinc-900 justify-between text-md bg-orange-500 text-nowrap w-full dark:border-orange-500 dark:text-zinc-900 border hover:bg-orange-500 border-orange-500 rounded-md p-2 font-bold transition ease-in-out dark:hover:text-zinc-900">
                                <span className='mr-2'>
                                    Save Flowlet
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`${bg}  dark:border-zinc-600 rounded-lg transition-colors duration-200`} style={{ height: '40vh', width: '100%' }}>
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
        </MainLayout>
    );
};

export default EasyConnectExample;