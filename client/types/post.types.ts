import { User } from "./user.types";

export interface PaginatedResponse<R> {
  count: number;
  next: string | null;
  previous: string | null;
  results: R;
}
export interface Post {
  id: string;
  title: string;
  text: string;
  created_at: string;
  updated_at: string;
  author: User;
}

export type PostListResponse = PaginatedResponse<Post[]>;
export type PostResponse = Post;

export interface Comment {
  id: string;
  text: string;
  created_at: string;
  updated_at: string;
  post: number;
  user: User;
}

export type CommentListResponse = PaginatedResponse<Comment[]>;
export type CommentResponse = Comment;
