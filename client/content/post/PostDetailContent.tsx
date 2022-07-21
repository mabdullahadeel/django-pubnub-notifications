import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { GET_ONE_POST } from "../../constants/queries";
import { postApi } from "../../services/postsApi";
import { AbsoluteCenter, Heading, Spinner } from "@chakra-ui/react";
import { PostCard } from "./PostCard";
import { CommentsSection } from "./CommentsSection";

interface PostDetailContentProps {}

export const PostDetailContent: React.FC<PostDetailContentProps> = ({}) => {
  const router = useRouter();
  const { postId } = router.query;

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery([GET_ONE_POST, postId as string], postApi.getOnePost, {
    enabled: !!postId && Boolean(Number(postId)),
    staleTime: 60 * 4 * 1000, // 4 minutes,
  });

  if (isLoading) {
    return (
      <AbsoluteCenter>
        <Spinner />
      </AbsoluteCenter>
    );
  }

  if (isError) {
    return (
      <AbsoluteCenter>
        <Heading>Error</Heading>
      </AbsoluteCenter>
    );
  }

  if (!post) {
    return (
      <AbsoluteCenter>
        <Heading>This post does not exist or deleted by owner</Heading>
      </AbsoluteCenter>
    );
  }

  return (
    <>
      <PostCard post={post.data} />
      <Heading my={6}>Comments</Heading>
      <CommentsSection postId={postId as string} />
    </>
  );
};
