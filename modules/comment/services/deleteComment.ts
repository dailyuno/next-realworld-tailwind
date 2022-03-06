import axios from "axios";
import { API_BASE_URL } from "~/common/utils/constants";

type DeleteCommentProps = {
  pid: string;
  commentId: string;
  token?: string;
};

export function deleteComment({ pid, commentId, token }: DeleteCommentProps) {
  return axios.delete(`${API_BASE_URL}/articles/${pid}/comments/${commentId}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}
