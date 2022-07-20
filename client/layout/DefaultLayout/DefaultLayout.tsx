import { Box, Container } from "@chakra-ui/react";
import React from "react";
import Nav from "./Nav";

interface DefaultLayoutProps extends React.PropsWithChildren {}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Nav />
      <Container>{children}</Container>
    </Box>
  );
};
