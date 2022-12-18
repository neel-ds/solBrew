# SOL GRANT
SOL Grant provides a platform to receive small donations from the audience for your projects on Solana. List your projects with a pitch and get your micro-grants right into your wallet. It is a boilerplate for donation camp.

![sol-grant](https://user-images.githubusercontent.com/79443588/208313249-74ced5c8-d10d-4eca-9195-7b291ab7de21.png)

## Prerequisites

The admin user must have Node.js and npm to use this boilerplate. Just download Node.js from [here](https://nodejs.org/en/download/). Every user must have Phantom or Solflare wallet to give or receive the donations. Checkout how to create phantom wallet from [here](https://help.phantom.app/hc/en-us/articles/8071074929043-How-to-create-a-new-wallet).

Owner needs to change the creatorsAddressor in [Product.js](https://github.com/neel-ds/sol-grant/blob/main/components/Product.js) file
```sh
#21 const creatorsAddress = "YOUR_WALLET_ADDRESS";  #Replace your wallet address
```

## Setup Instructions

Clone the repo via CLI:
```sh
git clone https://github.com/neel-ds/sol-grant
cd sol-grant
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