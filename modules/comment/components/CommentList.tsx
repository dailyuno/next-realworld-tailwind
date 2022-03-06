import ErrorMessage from "~/common/components/util/ErrorMessage";
import PreLoader from "~/common/components/util/PreLoader";
import useCommentList from "../hooks/useCommentList";
import { Comment } from "../types/comment";
import CommentItem from "./CommentItem";

const CommentList: React.FC = () => {
  const { data, error } = useCommentList();

  if (error) return <ErrorMessage />;
  if (!data) return <PreLoader />;

  const { comments } = data;

  return (
    <div>
      {comments.map((comment: Comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
