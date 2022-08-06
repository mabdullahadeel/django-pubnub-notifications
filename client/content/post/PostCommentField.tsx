import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postApi } from "../../services/postsApi";
import { GET_POST_COMMENT } from "../../constants/queries";

interface PostCommentFieldProps {
  postId: string;
}

export const PostCommentField: React.FC<PostCommentFieldProps> = ({
  postId,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
    },
  });
  const toast = useToast();
  const queryClient = useQueryClient();

  const createComment = useMutation(postApi.createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries([GET_POST_COMMENT]); // refetching comments
      resetCommentForm();
      toast({
        title: "Comment created",
        status: "success",
      });
    },
    onError: () => {
      resetCommentForm();
      toast({
        title: "Error creating comment",
        status: "error",
      });
    },
  });

  const resetCommentForm = () => {
    reset({ text: "" });
  };

  const onSubmit = () => {
    createComment.mutate({
      postId,
      text: getValues("text"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <HStack
        w="100%"
        alignItems="flex-start"
        flexDirection={{ sm: "column", md: "row", lg: "row", base: "column" }}
        spacing={1}
      >
        <FormControl flex={1} isInvalid={!!errors.text}>
          <Input
            mb={2}
            placeholder="Post a comment..."
            {...register("text", {
              required: "This is required field",
              minLength: {
                value: 6,
                message: "Comment must be at least 6 characters",
              },
            })}
          />
          <FormErrorMessage>
            {errors.text && errors.text.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mb={2}
          w={{ lg: "auto", md: "auto", sm: "100%", base: "100%" }}
          colorScheme="red"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Comment
        </Button>
      </HStack>
    </form>
  );
};
