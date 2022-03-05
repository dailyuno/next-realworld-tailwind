export type Post = {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  author: Author;
  favoritesCount: number;
  favorited: boolean;
};

export type Author = {
  username: string;
  bio: string | null;
  image: string;
  following?: boolean;
};
