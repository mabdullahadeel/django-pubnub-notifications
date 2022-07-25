import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthConsumer, AuthProvider } from "../context/TokenAuthContext";
import { NextPageWithLayout } from "../types/next.types";
import { AbsoluteCenter, Box, ChakraProvider, Spinner } from "@chakra-ui/react";
import { PubNubProvider } from "pubnub-react";
import { NotificationProvider } from "../context/NotificationsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as gtag from "../utils/gtag";

import PubNub from "pubnub";
import Script from "next/script";
import Head from "next/head";

const pubnub = new PubNub({
  publishKey: process.env.NEXT_PUBLIC_PUBNUB_PUBLISH_KEY!,
  subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY!,
  uuid: process.env.NEXT_PUBLIC_DEFAULT_PUBNUB_UUID!,
  ssl: process.env.NEXT_PUBLIC_PUBNUB_USE_SSL === "true",
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
    <>
      <Head>
        <title>DJ PubNub</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@django_pubnub" />
        <meta
          property="twitter:image"
          content="https://django-pubnub.vercel.app/django-pubnub.jpg"
        />
        <meta property="og:title" content="django-pubnub.vercel.app" />
        <meta property="og:url" content="https://django-pubnub.vercel.app/" />
        <meta name="description" content="Let's mess around with friends" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:description"
          content="Let's mess around with friends"
        />
        <meta
          property="og:image"
          content="https://django-pubnub.vercel.app/django-pubnub.jpg"
        />
        <meta
          property="og:image:url"
          content="https://django-pubnub.vercel.app/django-pubnub.jpg"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        id={"0"}
      />
      <Script
        id={"1"}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <ChakraProvider>
        <PubNubProvider client={pubnub}>
          <QueryClientProvider client={client}>
            <AuthProvider>
              <NotificationProvider>
                <AuthConsumer>
                  {(auth) =>
                    !auth.isInitialized ? (
                      <Box h="100vh">
                        <AbsoluteCenter>
                          <Spinner />
                        </AbsoluteCenter>
                      </Box>
                    ) : (
                      getLayout(<Component {...pageProps} />)
                    )
                  }
                </AuthConsumer>
              </NotificationProvider>
            </AuthProvider>
            <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
          </QueryClientProvider>
        </PubNubProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
