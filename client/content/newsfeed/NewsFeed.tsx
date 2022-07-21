import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { postApi } from "../../services/postsApi";
import { getQueryParamsFromURL } from "../../utils/query";
import { useInView } from "framer-motion";

interface NewsFeedProps {}
const POST_QUERY = "POST_QUERY";

export const NewsFeed: React.FC<NewsFeedProps> = ({}) => {
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

  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (!data) {
    return <Text>No Data</Text>;
  }

  return (
    <Box>
      {data.pages?.length > 0 ? (
        data.pages?.map((page) => (
          <React.Fragment key={page.data.next}>
            {page.data.results.map((post) => (
              <VStack
                key={post.id}
                alignItems="flex-start"
                bg="gray.700"
                p={4}
                borderRadius={5}
                w="100%"
                mb={4}
              >
                <HStack>
                  <Avatar
                    size={["sm", "md", "lg"]}
                    name={
                      post.author.first_name
                        ? `${post.author.first_name} ${post.author.last_name}`
                        : post.author.username
                    }
                  />
                  <VStack alignItems="flex-start">
                    <Text
                      fontSize={["large", "medium", "larger", "2xl"]}
                      fontWeight="bold"
                    >
                      @{post.author.username}
                    </Text>
                    <Text fontSize="small" color="gray.500">
                      {new Date(post.created_at).toLocaleString()}
                    </Text>
                  </VStack>
                </HStack>
                <Text
                  fontSize={["large", "medium", "xl"]}
                  fontWeight="bold"
                  pb={6}
                >
                  {post.title}
                </Text>
                <Text>{post.text}</Text>
                <Divider py={1} />
                <HStack w="100%">
                  <Input flex={1} placeholder="Add a comment" />
                  <Button colorScheme="red">Done</Button>
                </HStack>
              </VStack>
            ))}
          </React.Fragment>
        ))
      ) : (
        <Text>No Data</Text>
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
