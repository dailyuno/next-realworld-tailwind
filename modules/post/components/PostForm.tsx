import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import TextField from "~/common/components/ui/TextField";
import useForm from "~/common/hooks/useForm";
import { Post } from "../types/post";

type TagState = {
  tag: string;
};

type PostForm = Post & TagState;

type Props = {
  initialForm?: PostForm;
};

const initialState: PostForm = {
  title: "",
  description: "",
  body: "",
  tag: "",
  tagList: [],
};

const PostForm: React.FC<Props> = ({ initialForm }: Props) => {
  const { form, setForm, handleInputChange } = useForm<PostForm>(
    initialForm ?? initialState
  );
  const [isLoading, setLoading] = useState(false);

  const handleTagSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { tagList, tag } = form;

    setForm({
      ...form,
      tag: "",
      tagList: [...tagList, tag],
    });
  };

  return (
    <div>
      <form>
        <div className="mb-4">
          <TextField
            label="제목"
            name="title"
            type="title"
            value={form.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="설명"
            name="description"
            type="description"
            value={form.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <TextField
            label="내용"
            name="body"
            tag="textarea"
            value={form.body}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div className="mb-4">
        <form onSubmit={handleTagSubmit}>
          <TextField
            label="태그"
            name="tag"
            type="text"
            value={form.tag}
            onChange={handleInputChange}
          />
        </form>
        <ul className="flex">
          {form.tagList.map((tag, idx) => {
            return <li key={idx}>{tag}</li>;
          })}
        </ul>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className={`px-4 py-3 bg-blue-600 rounded text-sm text-gray-100 ${
            isLoading && "bg-blue-400 cursor-not-allowed"
          }`}
          disabled={isLoading}
        >
          글 작성
        </button>
      </div>
    </div>
  );
};

export default PostForm;
