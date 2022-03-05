import Image from "next/image";
import { Post } from "../types/post";

type Props = {
  post: Post;
};

const PostMeta: React.FC<Props> = ({ post }: Props) => {
  return (
    <div className="flex">
      <div className="relative w-8 h-8">
        <Image
          src={post.author.image}
          alt="프로필 이미지"
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </div>
      <div className="pl-2">
        <div className="text-sm">{post.author.username}</div>
        <div className="text-xs">{new Date(post.createdAt).toDateString()}</div>
      </div>
    </div>
  );
};

export default PostMeta;
