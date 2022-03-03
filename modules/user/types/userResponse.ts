import { User } from "./user";

export type UserResponseError = {
  username?: string[];
  email?: string[];
  password?: string[];
};

export type UserResponseData = {
  user: User;
};
