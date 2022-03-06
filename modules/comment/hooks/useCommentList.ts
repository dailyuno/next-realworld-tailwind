import { useRouter } from "next/router";
import useSWR from "swr";
import { API_BASE_URL } from "~/common/utils/constants";
import fetcher from "~/common/utils/fetcher";

function useCommentList() {
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const { data, error } = useSWR(
    `${API_BASE_URL}/articles/${pid}/comments`,
    fetcher
  );

  return { data, error };
}

export default useCommentList;
