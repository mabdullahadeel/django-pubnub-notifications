import { Box } from "@chakra-ui/react";
import React from "react";
import { NewsFeed } from "../newsfeed";

interface HomePageProps {}

export const HomePageContent: React.FC<HomePageProps> = ({}) => {
  return (
    <Box>
      <NewsFeed />
    </Box>
  );
};
