import axios from "axios";
import { API_BASE_URL } from "~/common/utils/constants";
import { DeleteCommentType } from "../types/request";

export function deleteComment({ pid, commentId, token }: DeleteCommentType) {
  return axios.delete(`${API_BASE_URL}/articles/${pid}/comments/${commentId}`, {
    headers: {
      Authorization: `Token ${encodeURIComponent(token)}`,
    },
  });
}
