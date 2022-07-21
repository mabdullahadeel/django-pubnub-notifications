import { PostResponse } from "../types/post.types";
import axiosInstance from "./axios";

export const postApi = {
  listPosts: ({
    queryKey,
  }: {
    queryKey: [string, { [key: string]: string | number | null }];
  }) => {
    const [_, queryParams] = queryKey;
    const path = `/posts/?`;
    const params = new URLSearchParams();
    Object.keys(queryParams).forEach((key) => {
      params.append(key, String(queryParams[key]) || "");
    });
    return axiosInstance.get<PostResponse>(path + params.toString());
  },
};
