import { Box, Button, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { PageBodyContainer } from "../../components/shared/Containers";
import Nav from "./Nav";

interface DefaultLayoutProps extends React.PropsWithChildren {}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Box>
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
      <Nav />
      <PageBodyContainer h="auto" pb={3}>
        <Flex gap={5}>
          <Link href="/">
            <Button>Feed</Button>
          </Link>
          <Link href="/posts/my">
            <Button>My Posts</Button>
          </Link>
        </Flex>
      </PageBodyContainer>
      <PageBodyContainer>{children}</PageBodyContainer>
    </Box>
  );
};
