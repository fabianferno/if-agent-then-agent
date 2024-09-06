"use client";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";

export default function Home() {
  const { address } = useAccount();

  useEffect(() => { }, []);

  return (
    <MainLayout>
      <div className="text-center text-2xl flex items-center justify-center h-full">
        {address ? <div>
          <div>{`Hello, ${address.slice(0, 6)}...${address.slice(-4)}`}</div>
          <div className="text-6xl mt-2 font-medium text-zinc-400 max-w-xl">Let&apos;s get started</div>
        </div> : <div>Connect your wallet to get started</div>}
      </div>
    </MainLayout>
  );
}
