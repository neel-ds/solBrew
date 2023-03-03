import React, { useState, useEffect } from "react";
import { Center, Text } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import Product from "../components/Product";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import Head from "next/head";

const bgImage = {
  backgroundImage:
    "url(https://bafybeiepzg5apnjl46h3lse4bqqab72wjwsqb3vwnjk7u4cmp4o4g72po4.ipfs.nftstorage.link)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  width: "auto",
  position: "fixed",
  zIndex: "-1",
};

const App = () => {
  // It fetches publicKey of any connected users' wallet or supported wallet.
  const { publicKey } = useWallet();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          ``;
        });
    }
  }, [publicKey]);

  const renderNotConnectedContainer = () => (
    <div>
      <br />
      <Center>
        <picture>
          <img
            className="donate"
            src="https://bafkreigjyt4bl5nd7p46wv5lsu5yitfxdt4cssptmwwxk5prmpotcycpqi.ipfs.nftstorage.link"
            alt="kindness"
          />
        </picture>
      </Center>
      <div className="sub-text detail">Kindly connect the wallet!</div>
      <br />
      <br />
      <br />
    </div>
  );

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <div className="App" style={bgImage}>
      <Head>
        <title>Explore</title>
        <meta name="description" content="solBrew" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <NavBar />
      <div className="container">
        <br />
        <br />
        <header className="header-container">
          <div className="title-container">
            <Text
              className="header"
              bgGradient="linear(to-l, #9945FF, #a13bf7, #02f3bb)"
              bgClip="text"
              fontWeight="extrabold"
            >
              SOL Brew
            </Text>
          </div>
        </header>
        <div className="sub-text detail">
          Brew your coffee with us! Your awesome contributions are highly
          appreciated and incentivized💰
        </div>
        <main>
          {/* Ensures wallet connection */}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
