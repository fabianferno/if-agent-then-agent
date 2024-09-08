"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Web3AuthConnectorInstance from "./Web3AuthConnectorInstance";
import { walletConnect } from "wagmi/connectors";
import { type Chain } from "viem";

const queryClient = new QueryClient();

const galadriel = {
  id: 696969,
  name: "Galadriel Devnet",
  nativeCurrency: { name: "Galadriel", symbol: "GAL", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://devnet.galadriel.com"] },
  },
  blockExplorers: {
    default: { name: "explorer", url: "https://explorer.galadriel.com" },
  },
} as const satisfies Chain;

// Set up client
export const config = createConfig({
  chains: [galadriel],
  transports: {
    [galadriel.id]: http(),
  },
  connectors: [Web3AuthConnectorInstance([galadriel])],
});

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
