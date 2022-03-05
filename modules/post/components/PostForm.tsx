import { AxiosResponse } from "axios";
import Router from "next/router";
import {
  ChangeEventHandler,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
} from "react";
import TextField from "~/common/components/ui/TextField";
import useAsyncData from "~/common/hooks/useAsyncData";
import useForm from "~/common/hooks/useForm";
import useUser from "~/modules/user/hooks/useUser";
import { createPost } from "../services/createPost";
import { PostForm } from "../types/postForm";
import { PostResponseData, PostResponseError } from "../types/postResponse";
import TagForm from "./TagForm";

const initialState: PostForm = {
  title: "",
  description: "",
  body: "",
  tagList: [],
};

type Props = {
  post?: PostForm;
};

const PostForm: React.FC<Props> = ({ post = initialState }: Props) => {
  const loginUser = useUser();
  const { form, setForm, handleInputChange } = useForm<PostForm>(post);

  const fetchData = useCallback(() => {
    return createPost({ ...form }, loginUser?.token);
  }, [form, loginUser]);

  const addTag = (tag: string) => {
    const { tagList } = post;
    setForm({
      ...post,
      tagList: tagList.concat(tag),
    });
  };

  const removeTag = (tag: string) => {
    const { tagList } = post;
    setForm({
      ...post,
      tagList: tagList.filter((storedTag) => storedTag !== tag),
    });
  };

  const { isLoading, errors, loadData } = useAsyncData<
    PostResponseData,
    PostResponseError
  >({
    fetchData,
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loadData();
    Router.push("/");
  };

  return (
    <div className="max-w-[40rem] px-4 m-auto">
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <TextField
            label="제목"
            name="title"
            type="title"
            value={post.title}
            errors={errors.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="설명"
            name="description"
            type="description"
            value={post.description}
            errors={errors.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="내용"
            name="body"
            tag="textarea"
            value={post.body}
            errors={errors.body}
            onChange={handleInputChange}
          />
        </div>

        <TagForm tagList={post.tagList} addTag={addTag} removeTag={removeTag} />

        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-4 py-3 bg-blue-600 rounded text-sm text-gray-100 ${
              isLoading ? "bg-blue-400 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            글 작성
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
