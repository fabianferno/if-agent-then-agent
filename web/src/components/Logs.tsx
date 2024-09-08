import React, { useState, useEffect } from 'react';

const initialLogs = [
    '[2024-03-15 10:30:15] INFO: Flowlet started',
    '[2024-03-15 10:30:16] DEBUG: Initializing News Agent',
    '[2024-03-15 10:30:17] INFO: News Agent connected to API',
];

const newLogEntries = [
    '[2024-03-15 10:30:18] DEBUG: Fetching latest headlines',
    '[2024-03-15 10:30:20] INFO: Retrieved 10 new articles',
    '[2024-03-15 10:30:21] DEBUG: Initializing Crypto Agent',
    '[2024-03-15 10:30:22] INFO: Crypto Agent connected to exchange',
    '[2024-03-15 10:30:23] INFO: As per the recent news we collected about ETH we gathered , that there would be slight decrease in the value of ETH , as the people started using non-evm blockchian like solona . The crypto traders believe that the ETH is going to drop nearly about 15 % in a week , due to  broader economic concerns can create negative market sentiment. Fear and uncertainty can lead to panic selling, driving the price down.',
    '[2024-03-15 10:30:23] DEBUG: Analyzing market trends',
    '[2024-03-15 10:30:25] WARNING: Unusual volatility detected in BTC/USD',
    '[2024-03-15 10:30:26] INFO: Notifying Social Agent',
    '[2024-03-15 10:30:24] INFO: Recent analysis of news and Farcaster data indicates that major crypto players are expressing concerns about Ethereum\'s potential decline due to the rise of non-EVM blockchains. Despite this, the significance of these insights is supported by the growing development of Layer 2 (L2) and Layer 3 (L3) solutions on Ethereum, which aim to enhance scalability and lower transaction costs. These advancements are vital for Ethereum to stay competitive. The ongoing transition to Ethereum 2.0 and the strong support from Ethereums developer community further reinforce its resilience. While there are challenges, these factors suggest that Ethereum is well-positioned to adapt and thrive amidst evolving blockchain trends.',
    '[2024-03-15 10:30:27] DEBUG: Social Agent preparing update',
    '[2024-03-15 10:30:24] INFO: As a crypto agent, I have analyzed data from previous agents and assessed the current market conditions. The insights suggest that there may be a significant risk of loss from holding ETH, given the market\'s shifting dynamics. Currently, you hold 4 ETH, 5000 USDC, and 100 LINK. To mitigate potential losses, I recommend converting your ETH into a stablecoin like USDC. Holding stablecoins for the next few weeks could help preserve your capital while the market stabilizes. This strategy aligns with the prevailing market sentiment and could help you minimize financial exposure during this period of volatility.',
    '[2024-03-15 10:30:28] INFO: Tweet posted about market conditions',
    '[2024-03-15 10:30:30] DEBUG: Flowlet cycle complete',
    '[2024-03-15 10:30:31] INFO: Waiting for next scheduled run...',
];

export default function Logs() {
    const [logs, setLogs] = useState(initialLogs);

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex < newLogEntries.length) {
                setLogs(prevLogs => [...prevLogs, newLogEntries[currentIndex]]);
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 1500); // Add a new log entry every 1.5 seconds

        return () => clearInterval(interval);
    }, []);

    const clearLogs = () => {
        setLogs([]);
    };

    return (
        <div className="mt-2 rounded-md border border-zinc-700 dark:border-zinc-600 p-4 bg-zinc-100 dark:bg-zinc-800">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold">Logs</h1>
                <button
                    className="text-sm px-2 py-1 bg-zinc-200 dark:bg-zinc-700 rounded hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                    onClick={clearLogs}
                >
                    Clear Logs
                </button>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded border border-zinc-300 dark:border-zinc-700">
                <pre className="text-sm  h-[100px] overflow-y-auto p-3 font-mono">
                    {logs.map((log, index) => (
                        <div key={index} className="py-1 border-b border-zinc-200 dark:border-zinc-800 last:border-b-0">
                            {log}
                        </div>
                    ))}
                </pre>
            </div>
        </div>
    );
}