import Providers from "@/components/Providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import '@xyflow/react/dist/style.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Some App",
  description: "This app does something",
  icons: ["/logo/logo-dark.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-black`}>
        <Providers>
          <div className="absolute top-5 right-5 flex items-center gap-4">
            <ConnectButton />
            <ModeToggle />
          </div>
          <main className="container flex min-h-screen flex-col items-center justify-center p-10">
            <div className="relative flex place-items-center mb-10">
              <Image
                className="relative mr-10"
                src="/giphy.gif"
                alt="Karma Logo"
                width={180}
                height={180}
                priority
              />
              <div className="mr-10">
                <div className="text-3xl font-bold">some app</div>
                <div className="text-lg ">this app does something</div>
              </div>
            </div>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
