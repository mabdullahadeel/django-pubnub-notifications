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
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { Comment } from "../../types/post.types";

interface PostCommentCardProps {
  comment: Comment;
}

export const PostCommentCard: React.FC<PostCommentCardProps> = ({
  comment,
}) => {
  const { user } = useAuth();
  return (
    <VStack
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
              comment.user.first_name
                ? `${comment.user.first_name} ${comment.user.last_name}`
                : comment.user.username
            }
          />
          <VStack alignItems="flex-start">
            <Text
              fontSize={["large", "medium", "larger", "2xl"]}
              fontWeight="bold"
            >
              @{comment.user.username}
            </Text>
            <Text fontSize="small" color="gray.500">
              {new Date(comment.created_at).toLocaleString()}
            </Text>
          </VStack>
        </HStack>
        {comment.user.id === user?.user.id && (
          <Menu>
            <MenuButton as={Button}>...</MenuButton>
            <MenuList>
              {/* <CreateOrUpdatePostModal
                postId={comment.id}
                openComponent={<MenuItem>Edit</MenuItem>}
              /> */}
              <MenuItem onClick={() => {}}>Delete</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
      <Text>{comment.text}</Text>
    </VStack>
  );
};
