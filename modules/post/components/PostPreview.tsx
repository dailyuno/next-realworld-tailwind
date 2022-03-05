import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Post } from "../types/post";

type Props = {
  post: Post;
};

const PostPreview = ({ post }: Props) => {
  const [preview, setPreview] = useState(post);

  return (
    <div className="py-4 border-t border-solid border-gray-200">
      <div className="flex justify-between">
        <div className="flex">
          <div className="relative w-8 h-8">
            <Image
              src={preview.author.image}
              alt="프로필 이미지"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
          <div className="pl-2">
            <div className="text-sm">{preview.author.username}</div>
            <div className="text-xs">
              {new Date(preview.createdAt).toDateString()}
            </div>
          </div>
        </div>
        <button>♥ {preview.favoritesCount}</button>
      </div>
      <div className="flex flex-col pt-2">
        <h2 className="font-medium text-lg">{preview.title}</h2>
        <p className="text-sm text-gray-600">{preview.description}</p>
      </div>
      <div className="pt-2 flex justify-between">
        <span className="text-sm text-gray-400">read more</span>
        <div className="flex">
          {preview.tagList.map((tag) => {
            return (
              <Link key={tag} href={`?tag=${tag}`}>
                <a>
                  <div className="p-2 mr-2 bg-emerald-500 rounded text-xs text-white">
                    {tag}
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
