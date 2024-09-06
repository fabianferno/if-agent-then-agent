"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import Link from 'next/link'

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex items-center w-full justify-between p-10">
            <div className="absolute top-5 right-5 ">
                <ModeToggle />
            </div>
            <div className="py-5 flex mr-5 flex-row items-center dark:bg-zinc-800 dark:ring-zinc-700 ring-1 ring-zinc-300 rounded-md p-2">
                <Link href="/">
                    <Image
                        className="relative rounded-md hover:scale-105 transition-all duration-300"
                        src="/giphy.gif"
                        alt="Logo"
                        width={180}
                        height={180}
                        priority
                    />
                </Link>
                <div className="px-5 ml-2">
                    <div className="text-2xl font-bold dark:text-white">if-agent-then-agent</div>
                    <div className="text-md text-zinc-400 max-w-md">Our AI-powered tools can help you increase your productivity and give you hours back in your day.</div>
                    <div className="text-md flex flex-row items-center text-white rounded-md">
                        <Link className="px-2 mr-2 text-orange-500 py-2 rounded-md" href="/">/Home</Link>
                        <Link className="px-2 text-orange-500 py-2 rounded-md" href="/create">/Create</Link>
                    </div>

                    <ConnectButton />
                </div>
            </div>

            <section className="lg:max-w-5xl lg:w-full mt-20">
                <div className="ring-1 ring-zinc-700 rounded-xl p-8 w-full">
                    <div className="flex justify-center items-start flex-col">
                        <div className="flex justify-center items-between flex-col w-full">
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}