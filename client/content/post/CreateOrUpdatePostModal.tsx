import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { postApi } from "../../services/postsApi";
import { GET_ONE_POST, POST_QUERY } from "../../constants/queries";

interface CreateOrEditPostMoadlProps {
  postId?: string;
  openComponent?: React.ReactNode;
}

export const CreateOrUpdatePostModal: React.FC<CreateOrEditPostMoadlProps> = ({
  postId,
  openComponent,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: { title: "", text: "" },
  });
  const isEditing = !!postId;

  const { isFetching } = useQuery([GET_ONE_POST, postId!], postApi.getOnePost, {
    enabled: !!postId,
    onSuccess: (data) => {
      reset({ title: data.data.text, text: data.data.text || "" });
    },
    onError: () => closeModal(),
    staleTime: 10 * 1000,
  });

  const closeModal = () => {
    if (postId) {
      queryClient.invalidateQueries([GET_ONE_POST]);
    }
    reset();
    onClose();
  };

  const updatePost = useMutation(postApi.updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries([POST_QUERY]);
      toast({
        title: "Success",
        status: "success",
      });
      closeModal();
      resetForm();
    },
    onError: () => {
      toast({
        title: "Could not update post",
        status: "error",
      });
    },
  });

  const createPost = useMutation(postApi.createPost, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([POST_QUERY]);
      toast({
        title: "Success",
        status: "success",
      });
      closeModal();
      resetForm();
    },
    onError: () => {
      toast({
        title: "Something went wrong!",
        status: "error",
      });
    },
  });

  const resetForm = () => {
    reset({ title: "", text: "" });
  };

  const onSubmit = () => {
    const values = getValues();
    if (isDirty && postId) {
      updatePost.mutate({
        postId,
        title: values.title,
        text: values.text,
      });
    } else if (isDirty) {
      createPost.mutate({
        title: values.title,
        text: values.text,
      });
    }
  };

  const buttonsDisabled = () =>
    createPost.isLoading || updatePost.isLoading || isFetching;

  return (
    <Box>
      {openComponent ? (
        <Box onClick={onOpen} w="100%">
          {openComponent}
        </Box>
      ) : (
        <Button w="100%" colorScheme="red" onClick={onOpen}>
          {isEditing ? "Update Post" : "Add Post"}
        </Button>
      )}
      <Modal
        closeOnOverlayClick={false}
        size="xl"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>{isEditing ? "Update Post" : "Add Post"}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isInvalid={!!errors.title}>
                <Input
                  placeholder="Post Title...."
                  background={useColorModeValue("gray.300", "gray.600")}
                  type="text"
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("title", {
                    required: "This is required field",
                    minLength: {
                      value: 5,
                      message: "Title must be at least 5 characters",
                    },
                    maxLength: {
                      value: 55,
                      message: "Title must be at most 55 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.text}>
                <Textarea
                  rows={5}
                  placeholder="Your thoughts 💭...."
                  background={useColorModeValue("gray.300", "gray.600")}
                  variant="filled"
                  size="lg"
                  mt={6}
                  {...register("text", {
                    maxLength: {
                      value: 700,
                      message: "Description must be at most 700 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.text && errors.text.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Stack direction="row" spacing={4}>
                <Button isLoading={buttonsDisabled()} onClick={onClose}>
                  Close
                </Button>
                <Button
                  colorScheme="red"
                  type="submit"
                  isLoading={buttonsDisabled()}
                  loadingText={isEditing ? "Updating" : "Creating"}
                >
                  {isEditing ? "Update" : "Create"}
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};
