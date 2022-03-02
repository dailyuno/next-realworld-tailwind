export type ResponseUserError = {
  username?: string[];
  email?: string[];
  password?: string[];
};

export type ResponseUserData = {
  user: {
    email: string;
    image: string;
    token: string;
    username: string;
  };
};
