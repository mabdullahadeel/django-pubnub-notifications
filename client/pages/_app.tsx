import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthConsumer, AuthProvider } from "../context/TokenAuthContext";
import { NextPageWithLayout } from "../types/next.types";
import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ChakraProvider>
      <AuthProvider>
        <AuthConsumer>
          {(auth) =>
            !auth.isInitialized ? (
              <Flex
                h="100vh"
                w="100vw"
                alignItems="center"
                justifyContent="center"
              >
                <Spinner />
              </Flex>
            ) : (
              getLayout(<Component {...pageProps} />)
            )
          }
        </AuthConsumer>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
