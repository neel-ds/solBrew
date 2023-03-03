import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react"; // Provides interface for wallet
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import "../styles/globals.css";
import "../styles/App.css";
import { ChakraProvider } from "@chakra-ui/react";

const App = ({ Component, pageProps }) => {
  // According to the requirements, the network can be set to Devnet, Testnet or Mainnet
  const network = WalletAdapterNetwork.Devnet;

  // Create RPC endpoint to interact with the block and perform transactions
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })],
    [network]
  );

  // add background image with responsive
  const bgImage = {
    backgroundImage:
      "url(https://bafybeiepzg5apnjl46h3lse4bqqab72wjwsqb3vwnjk7u4cmp4o4g72po4.ipfs.nftstorage.link)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "auto",
    width: "auto",
    position: "absolute",
    zIndex: "-1",
  };

  return (
    <ChakraProvider>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div style={bgImage}>
              <Component {...pageProps} />
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </ChakraProvider>
  );
};

export default App;
