import { User } from "./user.types";

export interface Post {
  id: string;
  title: string;
  text?: string;
  created_at: string;
  updated_at: string;
  author: User;
}

export interface PostListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}

export interface PostResponse extends Post {}
