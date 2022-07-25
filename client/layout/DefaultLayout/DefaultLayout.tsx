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
