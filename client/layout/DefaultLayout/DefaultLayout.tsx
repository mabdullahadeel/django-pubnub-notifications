import { Box } from "@chakra-ui/react";
import React from "react";
import { PageBodyContainer } from "../../components/shared/Containers";
import Nav from "./Nav";

interface DefaultLayoutProps extends React.PropsWithChildren {}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <Box>
      <Nav />
      <PageBodyContainer>{children}</PageBodyContainer>
    </Box>
  );
};
