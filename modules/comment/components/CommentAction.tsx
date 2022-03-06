import { useRouter } from "next/router";
import { useCallback } from "react";
import { mutate } from "swr";
import { API_BASE_URL } from "~/common/utils/constants";
import useUser from "~/modules/user/hooks/useUser";
import { deleteComment } from "../services/deleteComment";
import useAsyncData from "~/common/hooks/useAsyncData";

type Props = {
  commentId: string;
};

const CommentAction: React.FC<Props> = ({ commentId }: Props) => {
  const user = useUser();
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const fetchData = useCallback(() => {
    return deleteComment({
      pid: String(pid),
      commentId,
      token: user.token as string,
    });
  }, [pid, commentId, user]);

  const { isLoading, loadData } = useAsyncData(fetchData);

  const handleDelete = useCallback(async () => {
    await loadData();
    mutate(`${API_BASE_URL}/articles/${pid}/comments`);
  }, [loadData, pid]);

  return (
    <div className="flex">
      <button
        className={`p-2 bg-rose-500 rounded text-xs text-white ${
          isLoading ? "bg-rose-300 cursor-not-allowed" : ""
        }`}
        onClick={handleDelete}
        disabled={isLoading}
      >
        삭제
      </button>
    </div>
  );
};

export default CommentAction;
