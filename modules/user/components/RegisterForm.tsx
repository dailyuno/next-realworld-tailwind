import { AxiosResponse } from "axios";
import Router from "next/router";
import { FormEvent, SyntheticEvent, useCallback, useState } from "react";
import { mutate } from "swr";
import TextField from "~/common/components/ui/TextField";
import useAsyncData from "~/common/hooks/useAsyncData";
import useForm from "../hooks/useForm";
import { createUser } from "../services/createUser";
import { ResponseUserData, ResponseUserError } from "../types/responseUser";

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
  const { form, handleInputChange } = useForm<RegisterForm>(initialForm);

  const fetchData = useCallback(() => {
    const { username, email, password } = form;
    return createUser(username, email, password);
  }, [form]);

  const { isLoading, errors, data, loadData } = useAsyncData<
    ResponseUserData,
    ResponseUserError
  >({
    fetchData,
  });

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
