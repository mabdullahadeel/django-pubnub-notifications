import {
  AbsoluteCenter,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { postApi } from "../../services/postsApi";
import { getQueryParamsFromURL } from "../../utils/query";
import { useInView } from "framer-motion";
import { CreateOrUpdatePostModal } from "../post/CreateOrUpdatePostModal";
import { POST_QUERY } from "../../constants/queries";
import { useAuth } from "../../hooks/useAuth";

interface NewsFeedProps {
  author?: 0 | 1;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ author = 0 }) => {
  const { user } = useAuth();
  const ref = useRef(null);
  const inView = useInView(ref);
  const queryClient = useQueryClient();
  const toast = useToast();

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

  const deletePost = useMutation(postApi.deletePost, {
    onSuccess: () => {
      toast({
        title: "Success",
        status: "success",
      });
      queryClient.invalidateQueries([POST_QUERY]);
    },
  });

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
              <VStack
                key={post.id}
                alignItems="flex-start"
                bg="gray.700"
                p={4}
                borderRadius={5}
                w="100%"
                mb={4}
              >
                <Flex w="100%" justifyContent="space-between">
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
                  {post.author.id === user?.user.id && (
                    <Menu>
                      <MenuButton as={Button}>...</MenuButton>
                      <MenuList>
                        <CreateOrUpdatePostModal
                          postId={post.id}
                          openComponent={<MenuItem>Edit</MenuItem>}
                        />
                        <MenuItem
                          onClick={() => deletePost.mutate({ postId: post.id })}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </Flex>
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
