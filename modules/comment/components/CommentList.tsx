import ErrorMessage from "~/common/components/util/ErrorMessage";
import PreLoader from "~/common/components/util/PreLoader";
import useUser from "~/modules/user/hooks/useUser";
import useCommentList from "../hooks/useCommentList";
import { Comment } from "../types/comment";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const CommentList: React.FC = () => {
  const user = useUser();
  const { data, error } = useCommentList();

  if (error) return <ErrorMessage />;
  if (!data) return <PreLoader />;

  const { comments } = data;

  return (
    <div>
      {user.isLoggedIn && <CommentForm />}

      {comments.map((comment: Comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
