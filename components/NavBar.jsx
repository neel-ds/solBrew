import {
    chakra,
    Flex,
    HStack,
    Text
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React from "react";
import {useRouter} from "next/router";
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
            <chakra.header
                bg={'transparent'}
                w="full"
                px={{ base: 4, sm: 6 }}
                py={4}
            >
                <Flex alignItems="center" justifyContent="space-between" mx="auto">
                    <HStack display="flex" alignItems="center" spacing={1} >
                    <Flex onClick={() => { router.push('/') }}>
                    <img src={"https://sol-minter-pi.vercel.app/_next/image?url=%2FsolanaLogoMark.png&w=64&q=75"} alt='Solana logo' width='70%' height={'70%'} /> 
                    </Flex>
                    <Text fontWeight={'bold'} fontSize='xl' > SOL Grants </Text>
                    </HStack>
                    <HStack display="flex" alignItems="center" spacing={1} >
                        <WalletMultiButtonDynamic style={{ 'background':'#260367' }} />
                    </HStack>
                </Flex>
            </chakra.header>
        </React.Fragment>
    )
}