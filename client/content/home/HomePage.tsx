import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { NotificationsContext } from "../../context/NotificationsContext";
import { NewsFeed } from "../newsfeed";

interface HomePageProps {}

export const HomePageContent: React.FC<HomePageProps> = ({}) => {
  const { messages } = useContext(NotificationsContext);
  return (
    <Box>
      {messages.map((message) => (
        <Box key={message.id}>
          {message.message} - {message.peek} = {message.id}
        </Box>
      ))}
      <NewsFeed />
    </Box>
  );
};
