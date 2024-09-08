import { WagmiProvider, createConfig, http, useAccount, useConnect, useDisconnect } from "wagmi";


export default function ConnectButton() {
    const { address, connector, isConnected } = useAccount();
    const { connect, connectors, error } = useConnect();
    const { disconnect } = useDisconnect();

    if (isConnected) {
        return (
            <div className="flex flex-col items-start space-y-2 py-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg shadow-md">
                <div className="text-md font-semibold text-zinc-800 dark:text-zinc-200">Connected to {connector?.name}</div>
                <div className="flex items-center space-x-2">
                    <div
                        className="text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors bg-zinc-200 dark:bg-zinc-700 px-3 py-1 rounded-l-md"
                        onClick={() => {
                            navigator.clipboard.writeText(address || '');
                            // Optionally, you can add a visual feedback here, like a tooltip or a temporary message
                        }}
                        title="Click to copy address"
                    >
                        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
                    </div>
                    <button
                        className="px-3 py-1 bg-red-500 text-sm text-white rounded-r-md hover:bg-red-600 transition duration-300 ease-in-out"
                        onClick={disconnect as any}
                    >
                        Disconnect
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div className="main">

                <button
                    className="px-3 py-1 bg-orange-500 font-bold text-sm text-black rounded-md hover:bg-orange-600 transition duration-300 ease-in-out"
                    onClick={() => connect({ connector: connectors.find(connector => connector.id === "web3auth") as any })}
                >
                    Connect
                </button>


                {error && <div>{error.message}</div>}
            </div>
        );
    }
}

