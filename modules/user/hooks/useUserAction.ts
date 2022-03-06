import { FormEvent, useCallback } from "react";
import useAsyncData, { useAsyncDataProps } from "~/common/hooks/useAsyncData";
import { UserResponseData, UserResponseError } from "../types/userResponse";
import setUser from "../utils/setUser";

function useUserAction(fetchData: useAsyncDataProps) {
  const { isLoading, errors, loadData } = useAsyncData<
    UserResponseData,
    UserResponseError
  >(fetchData);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = await loadData();
      setUser(data);
    },
    [loadData]
  );

  return { isLoading, errors, handleSubmit };
}

export default useUserAction;
