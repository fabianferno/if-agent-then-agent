"use client";

// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import Link from 'next/link'
import ConnectButton from "@/components/ConnectButton";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex items-center w-full justify-between p-10 h-screen">
            <div className="absolute top-5 right-5">
                <ModeToggle />
            </div>
            <div className="py-5 mr-5 flex flex-col px-5 items-start justify-between dark:bg-zinc-800 dark:ring-zinc-700 ring-1 ring-zinc-300 rounded-md p-2">
                <Link className="mb-2" href="/">
                    <Image
                        className="relative rounded-md mb-2"
                        src="/if-agent-then-agent.png"
                        alt="Logo"
                        width={200}
                        height={200}
                        priority
                    />
                </Link>
                <div className="">
                    <div className="text-2xl font-bold dark:text-white">if-agent-then-agent</div>
                    <div className="text-md text-zinc-400 max-w-md">Our AI-powered tools can help you increase your productivity and give you hours back in your day.</div>
                    <div className="text-md flex gap-5 flex-row items-center text-white rounded-md">
                        <Link className="text-orange-500 py-2 rounded-md" href="/">/home</Link>
                        <Link className="text-orange-500 py-2 rounded-md" href="/flowlets/create">/create</Link>
                        <Link className="text-orange-500 py-2 rounded-md" href="/flowlets">/explore</Link>
                    </div>

                    <ConnectButton />
                </div>
            </div>

            <section className="max-w-7xl">
                <div className="ring-1 ring-zinc-700 rounded-xl p-6 w-full">
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