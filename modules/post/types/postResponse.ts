import { Post } from "./post";

export type PostResponseError = {
  title?: string[];
  description?: string[];
  body?: string[];
};

export type PostResponseData = {
  article: Post;
};
