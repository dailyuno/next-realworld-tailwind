import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "~/common/utils/constants";
import { UserRegisterForm } from "../types/form";

export function createUser({
  username,
  email,
  password,
}: UserRegisterForm): Promise<AxiosResponse> {
  return axios.post(`${API_BASE_URL}/users`, {
    user: {
      username,
      email,
      password,
    },
  });
}
