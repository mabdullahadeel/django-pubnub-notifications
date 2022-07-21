import {
  VStack,
  Flex,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Divider,
  Text,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDeletePostMutation } from "../../lib/mutaions/posts";
import { Post } from "../../types/post.types";
import { CreateOrUpdatePostModal } from "./CreateOrUpdatePostModal";
import { PostCommentField } from "./PostCommentField";

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuth();
  const deletePost = useDeletePostMutation();

  return (
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
              <MenuItem onClick={() => deletePost.mutate({ postId: post.id })}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Link href={`/p/${post.id}`}>
        <Box
          w="100%"
          _hover={{
            cursor: "pointer",
            color: "gray.300",
          }}
        >
          <Text fontSize={["large", "medium", "xl"]} fontWeight="bold" pb={6}>
            {post.title}
          </Text>
          <Text>{post.text}</Text>
        </Box>
      </Link>
      <Divider py={1} />
      <PostCommentField postId={post.id} />
    </VStack>
  );
};
