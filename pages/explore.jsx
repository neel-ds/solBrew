import React, { useState, useEffect } from "react";
import { Center, Text } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import Product from "../components/Product";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

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
            src="https://bafkreidl2ilyfc3iijz25i24mvdybrnm56aylop7akwfgzblmxnygwqdqy.ipfs.nftstorage.link/"
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
    <div className="App">
      <NavBar />
      <div className="container">
        <br />
        <br />
        <header className="header-container">
          <div className="title-container">
            <Text
              className="header"
              bgGradient="linear(to-l, #3f5ced, #a13bf7f9, #02f3bb)"
              bgClip="text"
              fontWeight="extrabold"
            >
              SOL Grant
            </Text>
          </div>
        </header>
        <div className="sub-text detail">
          It is a platform for awesome contributors to support work over the
          Solana network.
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
