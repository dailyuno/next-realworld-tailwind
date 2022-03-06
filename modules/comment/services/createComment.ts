import { API_BASE_URL } from "~/common/utils/constants";
import axios from "axios";
import { CreateCommentType } from "../types/request";

export default function createComment({
  pid,
  comment,
  token,
}: CreateCommentType) {
  return axios.post(
    `${API_BASE_URL}/articles/${encodeURIComponent(pid)}/comments`,
    {
      comment,
    },
    {
      headers: {
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
    }
  );
}
