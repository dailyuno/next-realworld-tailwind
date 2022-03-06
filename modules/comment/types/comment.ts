import { Author } from "~/modules/post/types/post";

export type Comment = {
  createdAt: number;
  id: string;
  body: string;
  slug: string;
  author: Author;
  updatedAt: number;
};
