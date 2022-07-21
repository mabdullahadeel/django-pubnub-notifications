import {
  AbsoluteCenter,
  Box,
  Button,
  Center,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postApi } from "../../services/postsApi";
import { getQueryParamsFromURL } from "../../utils/query";
import { useInView } from "framer-motion";
import { CreateOrUpdatePostModal } from "../post/CreateOrUpdatePostModal";
import { POST_QUERY } from "../../constants/queries";
import { PostCard } from "../post";

interface NewsFeedProps {
  author?: 0 | 1;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ author = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [
      POST_QUERY,
      {
        limit: 10,
        offset: 0,
        author,
      },
    ],
    postApi.listPosts,
    {
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
    if (inView) {
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

  if (!data) {
    return <Text>No Data</Text>;
  }

  return (
    <Box>
      <CreateOrUpdatePostModal
        openComponent={
          <Box
            w="100%"
            border="1px solid"
            borderColor="gray.600"
            my={5}
            borderRadius={5}
            h="100px"
            p={3}
            _hover={{
              cursor: "pointer",
            }}
          >
            <Box
              bg="gray.700"
              p={2}
              borderRadius={5}
              h="100%"
              _hover={{
                bg: "gray.600",
              }}
            >
              <Text color="gray.500" fontSize="2xl">
                Create Your Post Here 👋....
              </Text>
            </Box>
          </Box>
        }
      />
      {data.pages?.length > 0 ? (
        data.pages?.map((page) => (
          <React.Fragment key={page.data.next}>
            {page.data.results.map((post) => (
              <PostCard post={post} key={post.id} />
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
    </Box>
  );
};
