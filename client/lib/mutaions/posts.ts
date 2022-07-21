import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { POST_QUERY } from "../../constants/queries";
import { postApi } from "../../services/postsApi";

export const useDeletePostMutation = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation(postApi.deletePost, {
    onSuccess: () => {
      toast({
        title: "Success",
        status: "success",
      });
      queryClient.invalidateQueries([POST_QUERY]);
      router.push("/");
    },
  });
};
