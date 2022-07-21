import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { GET_POST_COMMENT } from "../../constants/queries";
import { postApi } from "../../services/postsApi";
import {
  AbsoluteCenter,
  Button,
  Center,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useInView } from "framer-motion";
import { getQueryParamsFromURL } from "../../utils/query";
import { PostCommentCard } from "./PostCommentCard";
import { useRouter } from "next/router";

interface CommentsSectionProps {
  postId?: string;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const router = useRouter();
  const { postId: routePostId } = router.query;

  const {
    data: comments,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [
      GET_POST_COMMENT,
      {
        limit: 10,
        offset: 0,
        postId: parseInt(postId ?? (routePostId as string) ?? "0", 10),
      },
    ],
    postApi.listComments,
    {
      enabled: !!postId || !!routePostId,
      getNextPageParam: (lastPage) => {
        const lastPageData = lastPage.data;
        const nextPageUrl = lastPageData.next;
        const nextPageUrlParams = getQueryParamsFromURL(nextPageUrl ?? "");
        return nextPageUrlParams ?? undefined;
      },
      staleTime: 60 * 3 * 1000, // 3 minutes,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

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

  if (!comments) {
    return (
      <AbsoluteCenter>
        <Heading>This post does not exist or deleted by owner</Heading>
      </AbsoluteCenter>
    );
  }

  return (
    <>
      {comments.pages?.length > 0 ? (
        comments.pages?.map((comment) => (
          <React.Fragment key={comment.data.next}>
            {comment.data.results.map((comment) => (
              <PostCommentCard key={comment.id} comment={comment} />
            ))}
          </React.Fragment>
        ))
      ) : (
        <Text>No Posts</Text>
      )}
      {hasNextPage && (
        <Center>
          <Button
            ref={ref}
            variant="outline"
            onClick={() => fetchNextPage()}
            isLoading={isFetchingNextPage}
          >
            Load More
          </Button>
        </Center>
      )}
    </>
  );
};
