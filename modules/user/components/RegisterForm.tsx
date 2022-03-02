import Router from "next/router";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { mutate } from "swr";
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

const RegisterForm: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>(initialForm);

  const handleInputChange = useCallback(
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
  const [errors, setErrors] = useState<{ key?: string[] }>({});

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      try {
        const { username, email, password } = form;
        const { data, status } = await createUser(username, email, password);

        if (status !== 200 && data?.errors) {
          console.log(data.errors);
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
        <label htmlFor="username" className="block text-base mb-1">
          이름
        </label>
        <input
          id="username"
          name="username"
          type="text"
          className="border border-solid border-gray-200 rounded-sm w-full px-4 py-3"
          value={form.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-base mb-1">
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="border border-solid border-gray-200 rounded-sm w-full px-4 py-3"
          value={form.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-base mb-1">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="border border-solid border-gray-200 rounded-sm w-full px-4 py-3"
          value={form.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-3 bg-blue-600 rounded text-sm text-gray-100"
          disabled={isLoading}
        >
          회원가입
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
