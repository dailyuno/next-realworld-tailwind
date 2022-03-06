import useSWR from "swr";
import { API_BASE_URL } from "~/common/utils/constants";
import fetcher from "~/common/utils/fetcher";

function useTagList() {
  return useSWR(`${API_BASE_URL}/tags`, fetcher);
}

export default useTagList;
