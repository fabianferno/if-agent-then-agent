"use client";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function Home() {
  const account = useAccount();

  useEffect(() => { }, []);

  return (
    <section className="lg:max-w-5xl lg:w-full ">
      <div className="ring-1 ring-zinc-700 rounded-xl p-8 w-full">
        {account?.address ? (
          <div className="flex justify-center items-start flex-col">
            <div className="mt-10 flex justify-center items-between flex-col w-full">
              {/* Add content for connected users here */}
              <p>Welcome, connected user!</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col">
            <h3 className="text-md mb-5">
              Connect your wallet to get started
            </h3>
          </div>
        )}
      </div>
    </section>
  );
}
