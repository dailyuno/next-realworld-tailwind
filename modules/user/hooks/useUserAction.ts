import { AxiosResponse } from "axios";
import Router from "next/router";
import { FormEvent, SyntheticEvent, useCallback, useEffect } from "react";
import { mutate } from "swr";
import { UserResponseData } from "../types/userResponse";

type Props = {
  data: UserResponseData;
  loadData: (e: SyntheticEvent) => Promise<void>;
};

function useUserAction({ data, loadData }: Props) {
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      await loadData(e);

      if (data?.user) {
        window.localStorage.setItem("user", JSON.stringify(data.user));
        mutate("user", data.user);
        Router.push("/");
      }
    },
    [data, loadData]
  );

  return handleSubmit;
}

export default useUserAction;
