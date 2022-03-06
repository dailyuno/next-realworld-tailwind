import useSWR from "swr";
import ErrorMessage from "~/common/components/util/ErrorMessage";
import PreLoader from "~/common/components/util/PreLoader";
import { API_BASE_URL } from "~/common/utils/constants";
import fetcher from "~/common/utils/fetcher";
import { Comment } from "../types/comment";
import CommentItem from "./CommentItem";

type Props = {
  pid: string;
};

const CommentList: React.FC<Props> = ({ pid }: Props) => {
  const { data, error } = useSWR(
    `${API_BASE_URL}/articles/${pid}/comments`,
    fetcher
  );

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
