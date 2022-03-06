import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "~/common/utils/constants";
import { UserLoginForm } from "../types/form";

export function loginUser({
  email,
  password,
}: UserLoginForm): Promise<AxiosResponse> {
  return axios.post(`${API_BASE_URL}/users/login`, {
    user: {
      email,
      password,
    },
  });
}
