// Web3Auth Libraries
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Web3Auth } from "@web3auth/modal";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK, WALLET_ADAPTERS } from "@web3auth/base";
import { Chain } from "wagmi/chains";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

export default function Web3AuthConnectorInstance(chains: Chain[]) {
    // Create Web3Auth Instance
    const name = "if-agent-then-agent";
    const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x" + chains[0].id.toString(16),
        rpcTarget: chains[0].rpcUrls.default.http[0], // This is the public RPC we have added, please pass on your own endpoint while creating an app
        displayName: chains[0].name,
        tickerName: chains[0].nativeCurrency?.name,
        ticker: chains[0].nativeCurrency?.symbol,
        blockExplorerUrl: chains[0].blockExplorers?.default.url[0] as string,
    };

    const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

    const web3AuthInstance = new Web3Auth({
        clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "",
        chainConfig,
        privateKeyProvider,
        uiConfig: {
            appName: name,
            loginMethodsOrder: ["google", "github"],
            defaultLanguage: "en",
            modalZIndex: "2147483647",
            logoLight: "https://i.ibb.co/QCFr7f3/if-agent-then-agent.png",
            logoDark: "https://i.ibb.co/QCFr7f3/if-agent-then-agent.png",
            uxMode: "popup",
            mode: "auto"
        },
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
        enableLogging: true,
    });

    const walletServicesPlugin = new WalletServicesPlugin({
        walletInitOptions: {
            whiteLabel: {
                showWidgetButton: true,
            }
        }
    });
    web3AuthInstance.addPlugin(walletServicesPlugin);

    const modalConfig = {

    }

    return Web3AuthConnector({
        web3AuthInstance,
        modalConfig,
    });
}