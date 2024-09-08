"use client";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import Link from "next/link";

export default function Home() {
    const { address } = useAccount();

    useEffect(() => { }, []);

    return (
        <MainLayout>
            <div className="text-center flex items-center justify-center h-full w-[60vw]">
                <div className="mt-8 w-full">
                    <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">
                        Welcome to If-Agent-Then-Agent
                    </h1>
                    <p className="text-md text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
                        Create, connect, and automate your AI agents with ease. Unleash the power of intelligent workflows.
                    </p>

                    <div className="flex justify-center mt-4 mb-2">
                        {address ?
                            <div>{`Hello, ${address.slice(0, 6)}...${address.slice(-4)}`}</div> :
                            <div className="flex">Connect your wallet & get started</div>
                        }
                    </div>

                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-6 text-zinc-700 dark:text-zinc-200">
                            Discover flowlets
                        </h2>
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Search flowlets..."
                                className="w-full px-4 py-2 text-lg border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-[43vh] overflow-y-auto">
                            {[
                                { id: 1, name: "portfolio-minions-flowlet" },
                                { id: 2, name: "crypto-market-analyzer" },
                                { id: 3, name: "social-media-sentiment-tracker" },
                                { id: 4, name: "ai-content-generator" },
                                { id: 5, name: "smart-home-automation" },
                                { id: 6, name: "personal-finance-assistant" },
                                { id: 7, name: "health-and-fitness-coach" },
                                { id: 8, name: "language-learning-companion" },
                                { id: 9, name: "travel-planner-and-guide" },
                            ].map((flowlet) => (
                                <div key={flowlet.id} className="shadow-none hover:shadow-lg hover:border-[0.2px] hover:border-orange-500 text-start bg-white dark:bg-zinc-800 p-6 rounded-lg transition-shadow duration-300">
                                    <h3 className="text-xl font-medium mb-2 text-zinc-800 dark:text-zinc-100">{flowlet.name}</h3>
                                    <p className="text-zinc-600 dark:text-zinc-300 mb-4">Flowlet ID: {flowlet.id}</p>
                                    <Link
                                        href={`/flowlets/${flowlet.id}`}
                                        className="inline-block px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
                                    >
                                        Run Flowlet
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
