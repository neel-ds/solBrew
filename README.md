# SOL Brew
SOL Brew is a platform designed to empower creators, developers, and artists by providing them with a space to showcase their projects and receive micro-grants from their audience. By listing their projects on the platform and presenting a compelling pitch, users can attract support from individuals who are passionate about their work. The platform offers a simple and streamlined process for collecting micro-grants, which are deposited directly into the owner's wallet.

<img width="1425" alt="solBrew home" src="https://user-images.githubusercontent.com/79443588/222789109-5205f031-8f63-4f84-87da-10e34bcd4546.png">

## Prerequisites

The admin user must have Node.js and npm to use this boilerplate. Just download Node.js from [here](https://nodejs.org/en/download/). Every user must have Phantom or Solflare wallet to give or receive the donations. Checkout how to create phantom wallet from [here](https://help.phantom.app/hc/en-us/articles/8071074929043-How-to-create-a-new-wallet).

Owner needs to change the creatorsAddressor in [Product.js](https://github.com/neel-ds/sol-grant/blob/main/components/Product.js#L21) file
```sh
const creatorsAddress = "YOUR_WALLET_ADDRESS";  #Replace your wallet address
```

## Setup Instructions

Clone the repo via CLI:
```sh
git clone https://github.com/neel-ds/solBrew
cd solBrew
```

Install the required packages:
```sh
npm install 
yarn install   #or
```

In the project directory, you can run:
```sh
npm run dev
yarn dev   #or
```

- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.