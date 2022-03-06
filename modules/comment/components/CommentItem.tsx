import Image from "next/image";
import useUser from "~/modules/user/hooks/useUser";
import { Comment } from "../types/comment";
import CommentAction from "./CommentAction";

type Props = {
  comment: Comment;
};

const CommentItem: React.FC<Props> = ({ comment }) => {
  const user = useUser();
  const isAuthor = user.isLoggedIn && user.username === comment.author.username;

  return (
    <div className="border border-solid border-gray-200 mb-4">
      <div className="p-6 text-sm">
        <p>{comment.body}</p>
      </div>
      <div className="flex justify-between p-6 text-sm bg-gray-200">
        <div className="flex items-end">
          <div className="relative w-8 h-8">
            <Image
              src={comment.author.image}
              alt="프로필 이미지"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
          <div className="ml-2">
            <div className="text-sm">{comment.author.username}</div>
            <div className="text-xs">
              {new Date(comment.createdAt).toDateString()}
            </div>
          </div>
        </div>

        {isAuthor && <CommentAction commentId={comment.id} />}
      </div>
    </div>
  );
};

export default CommentItem;
