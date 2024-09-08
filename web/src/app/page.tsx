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
      <div className="text-center flex items-center justify-center h-full">
        <div className="mt-8">
          <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-3">
            Welcome to If-Agent-Then-Agent
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto">
            Create, connect, and automate your AI agents with ease. Unleash the power of intelligent workflows.
          </p>

          <div className="flex justify-center mt-4 mb-2">
            {address ?
              <div>{`Hello, ${address.slice(0, 6)}...${address.slice(-4)}`}</div> :
              <div className="flex">Connect your wallet & get started</div>
            }
          </div>
          <div className="flex justify-center space-x-4">
            <Link
              href="/flowlets/create"
              className="px-4 py-2 font-bold border border-orange-500 text-zinc-100 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Create Flowlet
            </Link>
            <Link
              href="/flowlets"
              className="px-4 py-2 text-zinc-100 rounded-md hover:border-orange-500 border border-zinc-700 transition duration-300"
            >
              Explore Flowlets
            </Link>
          </div>
          <div className="mt-12">
            <h2 className="text-md font-semibold mb-4 text-zinc-700 dark:text-zinc-200">
              Key Features
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <li className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-2 text-zinc-800 dark:text-zinc-100">Intuitive Design</h3>
                <p className="text-zinc-600 dark:text-zinc-300 text-md">Create complex agent workflows with our user-friendly interface.</p>
              </li>
              <li className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-2 text-zinc-800 dark:text-zinc-100">AI Integration</h3>
                <p className="text-zinc-600 dark:text-zinc-300">Seamlessly integrate various AI models and services into your workflows.</p>
              </li>
              <li className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-2 text-zinc-800 dark:text-zinc-100">Web3 Ready</h3>
                <p className="text-zinc-600 dark:text-zinc-300">Built with blockchain technology for secure and decentralized operations.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
