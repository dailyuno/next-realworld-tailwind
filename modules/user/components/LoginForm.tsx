import { useCallback } from "react";
import TextField from "~/common/components/ui/TextField";
import useForm from "../hooks/useForm";
import useUserAction from "../hooks/useUserAction";
import { loginUser } from "../services/loginUser";
import { UserLoginForm } from "../types/userForm";

const initialForm: UserLoginForm = {
  email: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const { form, handleInputChange } = useForm<UserLoginForm>(initialForm);
  const fetchData = useCallback(() => loginUser({ ...form }), [form]);
  const { isLoading, errors, handleSubmit } = useUserAction({ fetchData });
  const anyErrors: [string, string[]][] = Object.entries(errors).filter(
    ([type]) => Object.keys(initialForm).indexOf(type) < 0
  );

  return (
    <form
      className="flex flex-col mt-8 w-[35rem] m-auto"
      onSubmit={handleSubmit}
    >
      {anyErrors.map(([type, error], idx) => {
        return (
          <div key={idx} className="text-red-600 mb-2">
            {type} {error}
          </div>
        );
      })}

      <div className="mb-4">
        <TextField
          label="이메일"
          name="email"
          type="email"
          value={form.email}
          errors={errors.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <TextField
          label="비밀번호"
          name="password"
          type="password"
          value={form.password}
          errors={errors.password}
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
          로그인
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
