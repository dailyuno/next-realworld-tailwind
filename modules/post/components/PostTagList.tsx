import Link from "next/link";
import PostTag from "./PostTag";

type Props = {
  tagList: string[];
  link?: boolean;
};

const PostTagList: React.FC<Props> = ({ tagList, link = true }: Props) => {
  return (
    <div className="flex">
      {tagList.map((tag) => {
        return link ? (
          <Link key={tag} href={`/?tag=${tag}`}>
            <a>
              <PostTag tag={tag} />
            </a>
          </Link>
        ) : (
          <PostTag key={tag} tag={tag} />
        );
      })}
    </div>
  );
};

export default PostTagList;
