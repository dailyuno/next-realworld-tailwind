import { useCallback } from "react";
import TextField from "~/common/components/ui/TextField";
import useForm from "~/common/hooks/useForm";
import useUserAction from "../hooks/useUserAction";
import { createUser } from "../services/createUser";
import { UserRegisterForm } from "../types/userForm";

const initialForm: UserRegisterForm = {
  username: "",
  email: "",
  password: "",
};

const RegisterForm: React.FC = () => {
  const { form, handleInputChange } = useForm<UserRegisterForm>(initialForm);
  const fetchData = useCallback(() => createUser({ ...form }), [form]);
  const { isLoading, errors, handleSubmit } = useUserAction({ fetchData });

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
