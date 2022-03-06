import Router from "next/router";
import { mutate } from "swr";
import { UserResponseData } from "../types/response";

function setUser(data: UserResponseData): void {
  if (data?.user) {
    window.localStorage.setItem("user", JSON.stringify(data.user));
    mutate("user", data.user);
    Router.push("/");
  }
}

export default setUser;
