import Router from "next/router";
import { mutate } from "swr";

function logoutUser(): void {
  localStorage.removeItem("user");
  mutate("user", null);
  Router.push("/");
}

export default logoutUser;
