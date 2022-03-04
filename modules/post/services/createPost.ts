import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "~/common/utils/constants";
import { Post } from "../types/post";

export function createPost(
  { title, description, body, tagList }: Post,
  token: string
): Promise<AxiosResponse> {
  return axios.post(
    `${API_BASE_URL}/articles`,
    {
      article: {
        title,
        description,
        body,
        tagList,
      },
    },
    {
      headers: {
        Authorization: `Token ${encodeURIComponent(token)}`,
      },
    }
  );
}
