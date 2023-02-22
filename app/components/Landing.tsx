import { Button, VStack, Image, Box, Text, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import styles from "@styles/Home.module.css";

function Landing() {
  const [isLoading, setLoading] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <main className={styles.landing}>
        <VStack gap={3} zIndex={1}>
          <VStack>
            <Box w={400}>
              <Image src="/logo.png" alt="journey" />
            </Box>
            <Text mt="-2 !important">
              Please connect your wallet to continue.
            </Text>
          </VStack>
          <Button onClick={() => {}} className={styles.connectButton}>
            {isLoading ? <Spinner color="white" /> : "Connect Wallet"}
          </Button>
        </VStack>
        <Box className={styles.ellipseOne}></Box>
      </main>
    </div>
  );
}

export default Landing;
