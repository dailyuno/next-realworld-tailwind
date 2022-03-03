export type UserResponseError = {
  username?: string[];
  email?: string[];
  password?: string[];
};

export type UserResponseData = {
  user: {
    email: string;
    image: string;
    token: string;
    username: string;
  };
};
