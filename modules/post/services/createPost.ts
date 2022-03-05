import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "~/common/utils/constants";
import { PostForm } from "../types/postForm";

export function createPost(
  { title, description, body, tagList }: PostForm,
  token: string = ""
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
