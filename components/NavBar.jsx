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
                className="solBrew"
                src={
                  "https://bafybeiajsvpelpkmydtvejknf6tplr6i5ovef7vlwbzkmnku7n7xep5shi.ipfs.nftstorage.link"
                }
                alt="Solana Brew"
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
