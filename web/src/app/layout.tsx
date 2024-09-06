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
  title: "if-agent-then-agent",
  description: "Our AI-powered tools can help you increase your productivity and give you hours back in your day.",
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
