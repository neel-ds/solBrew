import { chakra, Flex, HStack, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import { useRouter } from "next/router";

export const NavBar = () => {
  require("@solana/wallet-adapter-react-ui/styles.css");

  const WalletMultiButtonDynamic = dynamic(
    async () =>
      (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
    { ssr: false }
  );

  const router = useRouter();
  return (
    <React.Fragment>
      <chakra.header bg={"transparent"} w="full" px={{ base: 4, sm: 6 }} py={4}>
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <HStack display="flex" alignItems="center" spacing={1}>
            <Flex
              onClick={() => {
                router.push("/");
              }}
            >
              <img
                className="solanaLogo"
                src={
                  "https://bafkreiebs5cfjv56qgtnh35mkmnis4mxgkvbucohx3ybpz3ijinw3vvetq.ipfs.nftstorage.link/"
                }
                alt="Solana Logo"
              />
              <img
                className="cross"
                src={
                  "https://bafkreieamwfc6r7ufi7jutxipzh7qr5tcockaxvtky6rgcuhmeznce5r4a.ipfs.nftstorage.link/"
                }
                alt="cross"
              />
              <img
                className="mlhLogo"
                src={
                  "https://bafkreiak7ag57r3ulyjovhupxmw4mqowwkfurhn7vmvxawz3nv3vdexgpe.ipfs.nftstorage.link/"
                }
                alt="MLH Logo"
              />
            </Flex>
          </HStack>
          <HStack className="btn" display="flex" alignItems="center">
            <WalletMultiButtonDynamic />
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment>
  );
};
