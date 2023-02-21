import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";

const theme = extendTheme({
  styles: {
    global: {
      "html,body": {
        backgroundColor: "#000113",
      },
      "*": {
        fontFamily: "DM Sans",
        color: "white",
        backgroundColor: "transparent",
      },
      button: {
        backgroundColor: "transparent !important",
        border: "1px solid gray",
        _hover: {
          border: "1px solid lightgray",
        },
      },
    },
  },
});

export default function App({ Component, pageProps, router }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Journey: Fantom-Native Quests</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} key={router.route} />
    </ChakraProvider>
  );
}
