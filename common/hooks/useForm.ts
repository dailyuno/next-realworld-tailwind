import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";

type Form<T> = {
  form: T;
  setForm: Dispatch<SetStateAction<T>>;
  handleInputChange: ChangeEventHandler<Element>;
};

function useForm<T>(initialData: T): Form<T> {
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

  return { form, setForm, handleInputChange };
}

export default useForm;
