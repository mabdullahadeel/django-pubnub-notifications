import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { POST_QUERY } from "../../constants/queries";
import { postApi } from "../../services/postsApi";

export const useDeletePostMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(postApi.deletePost, {
    onSuccess: () => {
      toast({
        title: "Success",
        status: "success",
      });
      queryClient.invalidateQueries([POST_QUERY]);
    },
  });
};
