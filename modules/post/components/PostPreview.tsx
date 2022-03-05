import Link from "next/link";
import { useState } from "react";
import { Post } from "../types/post";
import PostMeta from "./PostMeta";
import PostTagList from "./PostTagList";

type Props = {
  post: Post;
};

const PostPreview = ({ post }: Props) => {
  const [preview, setPreview] = useState(post);

  return (
    <div className="py-4 border-t border-solid border-gray-200">
      <div className="flex justify-between">
        <PostMeta post={post} />
        <button>♥ {preview.favoritesCount}</button>
      </div>
      <div className="flex flex-col pt-2">
        <Link href={"/post/[pid]"} as={`/post/${preview.slug}`}>
          <a>
            <h2 className="font-medium text-lg">{preview.title}</h2>
            <p className="text-sm text-gray-600">{preview.description}</p>
          </a>
        </Link>
      </div>
      <div className="pt-2 flex justify-between">
        <Link href={"/post/[pid]"} as={`/post/${preview.slug}`}>
          <a className="text-sm text-gray-400">read more</a>
        </Link>

        <PostTagList tagList={preview.tagList} />
      </div>
    </div>
  );
};

export default PostPreview;
