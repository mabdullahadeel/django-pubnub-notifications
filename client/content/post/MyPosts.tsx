import React from "react";
import { NewsFeed } from "../newsfeed";

interface MyPostsProps {}

export const MyPosts: React.FC<MyPostsProps> = ({}) => {
  return <NewsFeed author={1} />;
};
