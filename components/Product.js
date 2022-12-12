import React from 'react';
import styles from "../styles/Product.module.css";

import {
  Grid,
  HStack,
  Box,
  Heading,
  Text,
  Image,
  Stack,
  NumberInput,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Button,
  NumberInputStepper,
  Center,
} from "@chakra-ui/react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import * as Web3 from '@solana/web3.js';
import { useState } from "react";
import { Footer } from './Footer';

export default function Product({ product }) {
  const { id, name, price, description, image_url } = product;
  const [txSig, setTxSig] = useState("");
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const creatorsAddress = "9GHp4CzMVFRxWW9ZjocBBc8fRZ69EQKjzVvvtiqzsNQE"
  const sendSol = async (event) => {
    event.preventDefault()
    if (!connection || !publicKey || !creatorsAddress) { return }
    const transaction = new Web3.Transaction();
    transaction.add(
        Web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new Web3.PublicKey(creatorsAddress),
            lamports: event.target.amount.value * Web3.LAMPORTS_PER_SOL
        }),
    );
    const latestBlockhash = await connection.getLatestBlockhash();
    transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
    transaction.recentBlockhash = latestBlockhash.blockhash;

    sendTransaction(transaction, connection).then((sig) => {
        setTxSig(sig)
    });
}

  return (
    <div className={styles.product_container}>
      <div className={styles.image_container}>
      <iframe width="560" height="315" src = {image_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
      <div className={styles.product_details}>
        <div className={styles.product_text}>
          <div className={styles.product_title}>{name}</div>
          <div className={styles.product_description}>{description}</div>
        </div>
        <div className={styles.product_action}>
        <form onSubmit={sendSol} >
                        <Stack mt={8} direction={'row'} spacing={2} >
                            <NumberInput width={'100%'} >
                                <NumberInputField
                                    placeholder='Enter Sol'
                                    flex={2}
                                    bg={'gray.100'}
                                    fontSize={'sm'}
                                    rounded={'md'}
                                    width={'full'}
                                    id='amount'
                                    _focus={{
                                        bg: 'gray.100',
                                    }} />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                            <Button
                                flex={1}
                                fontSize={'sm'}
                                rounded={'md'}
                                bg={'blue.700'}
                                size={'2xl'}
                                p={2}
                                color={'white'}
                                type='submit'
                                boxShadow={
                                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                }
                                _hover={{
                                    bg: 'blue.900',
                                }}
                                _focus={{
                                    bg: 'blue.900',
                                }}>
                                Send Sol
                            </Button>
                        </Stack>
                    </form>
        </div>
      </div>
    </div>
  );
}