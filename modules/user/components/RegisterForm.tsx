import Router from "next/router";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  useCallback,
  useState,
} from "react";
import { mutate } from "swr";
import TextField from "~/common/components/ui/TextField";
import { createUser } from "../services/createUser";

type RegisterForm = {
  username: string;
  email: string;
  password: string;
};

const initialForm: RegisterForm = {
  username: "",
  email: "",
  password: "",
};

type RegisterFormError = {
  username?: string[];
  email?: string[];
  password?: string[];
};

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>(initialForm);

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

  const [isLoading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<RegisterFormError>({});

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      try {
        const { username, email, password } = form;
        const { data, status } = await createUser(username, email, password);

        if (status !== 200 && data?.errors) {
          console.log(data.errors);
          console.log(typeof data.errors);
          setErrors(data.errors);
        }

        if (data?.user) {
          window.localStorage.setItem("user", JSON.stringify(data.user));
          mutate("user", data.user);
          Router.push("/");
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  return (
    <form
      className="flex flex-col mt-8 w-[35rem] m-auto"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <TextField
          label="이름"
          name="username"
          type="text"
          value={form.username}
          errors={errors.username ?? []}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="이메일"
          name="email"
          type="email"
          value={form.email}
          errors={errors.email ?? []}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="비밀번호"
          name="password"
          type="password"
          value={form.password}
          errors={errors.password ?? []}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className={`px-4 py-3 bg-blue-600 rounded text-sm text-gray-100 ${
            isLoading && "bg-blue-400 cursor-not-allowed"
          }`}
          disabled={isLoading}
        >
          회원가입
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
