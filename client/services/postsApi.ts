import { CommentListResponse, CommentResponse, PostListResponse, PostResponse } from "../types/post.types";
import axiosInstance from "./axios";

interface PostAPI {
  listPosts: (p: {
    queryKey: [string, { [key: string]: string | number | null }]
  }) => ReturnType<typeof axiosInstance.get<PostListResponse>>;
  getOnePost: (p: {
    queryKey: [string, string]
  }) => ReturnType<typeof axiosInstance.get<PostResponse>>;
  updatePost: ({
    title, text, postId
  }: {
    title: string, text: string, postId: string
  }) => ReturnType<typeof axiosInstance.patch<PostResponse>>;
  createPost: ({
    title, text
  }: {
    title: string, text: string
  }) => ReturnType<typeof axiosInstance.post<PostResponse>>;
  deletePost: ({postId}: {postId: string}) => ReturnType<typeof axiosInstance.delete>;
  listComments: (p: {
    queryKey: [string, { postId: string | number, [key: string]: string | number | null }]
  }) => ReturnType<typeof axiosInstance.get<CommentListResponse>>;
  createComment: ({postId, text}: {postId: string, text: string}) => ReturnType<typeof axiosInstance.post<CommentResponse>>;
  deleteComment: ({commentId}: {commentId: string}) => ReturnType<typeof axiosInstance.delete>;
  updateComment: ({commentId, text}: {commentId: string, text: string}) => ReturnType<typeof axiosInstance.patch<CommentResponse>>;
}

export const postApi: PostAPI = {
  listPosts: ({
    queryKey,
  }) => {
    const [_, queryParams] = queryKey;
    const path = `/posts/?`;
    const params = new URLSearchParams();
    Object.keys(queryParams).forEach((key) => {
      params.append(key, String(queryParams[key]) || "");
    });
    return axiosInstance.get(path + params.toString());
  },
  getOnePost: ({ queryKey }) => {
    const [_, postId] = queryKey;
    const path = `/posts/${postId}`;
    return axiosInstance.get(path);
  },
  updatePost({ title, text, postId }) {
    const path = `/posts/${postId}/`;
    return axiosInstance.patch(path, {title, text})
  },
  createPost({ title, text }) {
    const path = `/posts/`;
    return axiosInstance.post(path, {title, text})
  },
  deletePost({postId}) {
    const path = `/posts/${postId}/`;
    return axiosInstance.delete(path)
  },
  listComments: ({queryKey}) => {
    const [_, queryParams] = queryKey;
    const path = `posts/comments/${queryParams.postId}?`;
    const params = new URLSearchParams();
    Object.keys(queryParams).forEach((key) => {
      params.append(key, String(queryParams[key]) || "");
    });
    return axiosInstance.get(path + params.toString());
  },
  createComment({postId, text}) {
    const path = `/posts/comments/${postId}/`;
    return axiosInstance.post(path, {text})
  },
  deleteComment({commentId}) {
    const path = `posts/comments/ops/${commentId}/`;
    return axiosInstance.delete(path)
  },
  updateComment({commentId, text}) {
    const path = `posts/comments/ops/${commentId}/`;
    return axiosInstance.patch(path, {text})
  }
};
