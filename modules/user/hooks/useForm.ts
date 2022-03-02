import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";

function useForm<T>(initialData: T) {
  const [form, setForm] = useState<T>(initialData);
  const handleInputChange: ChangeEventHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setForm({
        ...form,
        [name]: value,
      });
    },
    [form]
  );

  return { form, handleInputChange };
}

export default useForm;
