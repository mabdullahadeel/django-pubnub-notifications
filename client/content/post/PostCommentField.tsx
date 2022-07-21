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
import { useMutation } from "@tanstack/react-query";
import { postApi } from "../../services/postsApi";

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

  const createComment = useMutation(postApi.createComment, {
    onSuccess: () => {
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
      <HStack w="100%" alignItems="flex-start">
        <FormControl flex={1} isInvalid={!!errors.text}>
          <Input
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
        <Button colorScheme="red">Comment</Button>
      </HStack>
    </form>
  );
};
