import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthConsumer, AuthProvider } from "../context/TokenAuthContext";
import { NextPageWithLayout } from "../types/next.types";
import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import { PubNubProvider } from "pubnub-react";
import { NotificationProvider } from "../context/NotificationsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PubNub from "pubnub";

const pubnub = new PubNub({
  publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY!,
  subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY!,
  uuid: process.env.NEXT_PUBLIC_DEFAULT_PUBNUB_UUID!,
});

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 300,
    },
  },
});

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp(props: MyAppProps) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ChakraProvider>
      <PubNubProvider client={pubnub}>
        <QueryClientProvider client={client}>
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
                  getLayout(
                    <NotificationProvider>
                      <Component {...pageProps} />
                    </NotificationProvider>
                  )
                )
              }
            </AuthConsumer>
          </AuthProvider>
        </QueryClientProvider>
      </PubNubProvider>
    </ChakraProvider>
  );
}

export default MyApp;
