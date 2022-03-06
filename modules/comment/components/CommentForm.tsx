import Image from "next/image";
import { useRouter } from "next/router";
import { FormEvent, useCallback } from "react";
import { mutate } from "swr";
import useAsyncData from "~/common/hooks/useAsyncData";
import useForm from "~/common/hooks/useForm";
import { API_BASE_URL } from "~/common/utils/constants";
import useUser from "~/modules/user/hooks/useUser";
import createComment from "../services/createComment";
import { CommentForm } from "../types/form";

const initialState = {
  body: "",
};

const CommentForm: React.FC = () => {
  const user = useUser();
  const { form, setForm, handleInputChange } =
    useForm<CommentForm>(initialState);
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const fetchData = useCallback(async () => {
    return createComment({
      comment: form,
      pid: String(pid),
      token: user.token as string,
    });
  }, [form, pid, user]);

  const { isLoading, loadData } = useAsyncData(fetchData);

  const handleFormSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await loadData();
      mutate(`${API_BASE_URL}/articles/${pid}/comments`);
      setForm({ ...form, body: "" });
    },
    [loadData, pid, setForm, form]
  );

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex flex-col border border-solid border-gray-300">
        <textarea
          className={`p-6 w-full border-b border-solid border-gray-300 resize-none ${
            isLoading ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
          id="body"
          name="body"
          value={form.body}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <div className="flex justify-between px-6 py-4 bg-gray-100">
          <div className="relative w-8 h-8">
            <Image
              src={user.image as string}
              alt="프로필 이미지"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
          <button
            type="submit"
            className={`p-2 bg-emerald-500 rounded text-xs text-white ${
              isLoading ? "bg-emerald-300 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            댓글 작성
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
