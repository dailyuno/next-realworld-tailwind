import { AxiosResponse } from "axios";
import { SyntheticEvent } from "react";
import { useState } from "react";

type AsyncData<T, D> = {
  isLoading: boolean;
  data: T;
  errors: D;
  loadData(): Promise<T>;
};

export type useAsyncDataProps = {
  fetchData: () => Promise<AxiosResponse>;
};

function useAsyncData<T, D>({ fetchData }: useAsyncDataProps): AsyncData<T, D> {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>({} as T);
  const [errors, setErrors] = useState<D>({} as D);

  async function loadData() {
    setLoading(true);

    try {
      const { data: response } = await fetchData();
      setData(response);
      return response;
    } catch (e: any) {
      setErrors(e?.response?.data?.errors ?? {});
    } finally {
      setLoading(false);
    }
  }

  return { isLoading, errors, data, loadData };
}

export default useAsyncData;
