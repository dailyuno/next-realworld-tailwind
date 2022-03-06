import { CommentForm } from "./form";

export type DeleteCommentType = {
  pid: string;
  commentId: string;
  token: string;
};

export type CreateCommentType = {
  pid: string;
  comment: CommentForm;
  token: string;
};
