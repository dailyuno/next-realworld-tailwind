import axios, { AxiosError, AxiosResponse } from "axios";
import { API_BASE_URL } from "~/common/utils/constants";

export async function createUser(
  username: string,
  email: string,
  password: string
): Promise<AxiosResponse> {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, {
      user: {
        username,
        email,
        password,
      },
    });
    return response;
  } catch (error: any) {
    return error.response;
  }
}
