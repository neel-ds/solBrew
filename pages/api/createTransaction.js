import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";
import products from "./products.json";

// Replace the recepient's wallet address to receive donations 
const sellerAddress = '9GHp4CzMVFRxWW9ZjocBBc8fRZ69EQKjzVvvtiqzsNQE'
const sellerPublicKey = new PublicKey(sellerAddress);

const createTransaction = async (req, res) => {
  try {
    const { buyer, orderID, itemID } = req.body;

    // Input validation before tx
    if (!buyer) {
      res.status(400).json({
        message: "Missing donator's address",
      });
    }

    if (!orderID) {
      res.status(400).json({
        message: "Missing order ID",
      });
    }

    // Store the itemPrice from products json
    const itemPrice = products.find((item) => item.id === itemID).price;

    if (!itemPrice) {
      res.status(404).json({
        message: "Item not found",
      });
    }
    
    // Node can't understand SOL so it converts into smaller unit LAMPORTS like Paises with Rupee
    const bigAmount = BigNumber(itemPrice);
    const buyerPublicKey = new PublicKey(buyer);
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const connection = new Connection(endpoint);
    const { blockhash } = await connection.getLatestBlockhash("finalized");
    
    // Before any tx, it requires recent blockhash to push any further tx on-chain
    const tx = new Transaction({
      recentBlockhash: blockhash,
      feePayer: buyerPublicKey,
    });

    // Whoa! Your donation will send via this magic
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: buyerPublicKey,
      // Lamports are the smallest unit of SOL, like Cents with Dollar
      lamports: bigAmount.multipliedBy(LAMPORTS_PER_SOL).toNumber(), 
      toPubkey: sellerPublicKey,
    });

    // It always need instructions whether to sign the transaction everytime or update
    transferInstruction.keys.push({
      pubkey: new PublicKey(orderID), 
      isSigner: false,
      isWritable: false,
    });

    tx.add(transferInstruction);
  
    // Formatting the transaction
    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
    });
    const base64 = serializedTransaction.toString("base64");

    res.status(200).json({
      transaction: base64,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "error creating tx" });
    return;
  }
}

export default function handler(req, res) {
  if (req.method === "POST") {
    createTransaction(req, res);
  } else {
    res.status(405).end();
  }
}