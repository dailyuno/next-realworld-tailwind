import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "~/common/utils/constants";
import { CreatePostType } from "../types/request";

export function createPost({
  post: { title, description, body, tagList },
  token,
}: CreatePostType): Promise<AxiosResponse> {
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
