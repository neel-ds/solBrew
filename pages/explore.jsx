import React, { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Product from '../components/Product';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { useRouter } from 'next/router';

const App = () => {

  // It fetches publicKey of any connected users' wallet or supported wallet.
  const { publicKey } = useWallet();
  const [products, setProducts] = useState([]);

    const router = useRouter();
  
  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);``
        });
    }
  }, [publicKey]);

  const renderNotConnectedContainer = () => (
    <div>
      <br/>
      <picture><img className='donate' src="https://ekhumfoundation.com/wp-content/uploads/2022/02/Donate-1024x818.jpeg" alt="kindness" /></picture>
      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button"/>
      </div>
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
      <NavBar/>
      <div className="container">
      <br/><br/>
        <header className="header-container">
          <div className="title-container">
           <h2 className="header">SOL Grant</h2>
          </div>
        </header>
        <div className="sub-text detail">
            SOL Grant is a platform to easily receive donations on the Solana network. It provides utilities to developer, artist and social events to raise some funds for their project or social deeds. </div>
        <main>
          {/* It will render connect waller button if there is no publicKey */}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>
        <Footer/>
      </div>
    </div>
  );
};

export default App;