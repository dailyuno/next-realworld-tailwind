import { AxiosResponse } from "axios";
import { SyntheticEvent } from "react";
import { useState } from "react";

type AsyncData<T, D> = {
  isLoading: boolean;
  data: T;
  errors: D;
  loadData(e: SyntheticEvent): Promise<void>;
};

type Props = {
  fetchData: () => Promise<AxiosResponse>;
};

function useAsyncData<T, D>({ fetchData }: Props): AsyncData<T, D> {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>({} as T);
  const [errors, setErrors] = useState<D>({} as D);

  async function loadData(e: SyntheticEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: response } = await fetchData();
      setData(response);
    } catch (e: any) {
      setErrors(e?.response?.data?.errors ?? {});
    } finally {
      setLoading(false);
    }
  }

  return { isLoading, errors, data, loadData };
}

export default useAsyncData;
