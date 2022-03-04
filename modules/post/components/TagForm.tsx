import { ChangeEvent, KeyboardEvent, useState } from "react";

type Props = {
  tagList: string[];
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
};

const TagForm: React.FC<Props> = ({ tagList, addTag, removeTag }: Props) => {
  const [tag, setTag] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setTag(e.target.value);

  const handleInputKeyDown = (e: KeyboardEvent<HTMLElement>): void => {
    const { key } = e;

    switch (key) {
      case "Enter":
      case "Tab":
      case "Comma":
        e.preventDefault();
        handleTag();
        break;
    }
  };

  const handleTag = (): void => {
    if (!!tag) {
      const existsTag = tagList.some((storedTag) => storedTag === tag);
      if (!existsTag) addTag(tag);
      setTag("");
    }
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col">
        <label htmlFor="tag" className="text-base mb-1">
          태그
        </label>
        <input
          id="tag"
          name="tag"
          type="text"
          className="border border-solid border-gray-200 rounded-sm w-full px-4 py-3"
          value={tag}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onBlur={handleTag}
        />
      </div>
      <ul className="flex flex-wrap mt-4">
        {tagList.map((tag) => {
          return (
            <li
              key={tag}
              className="flex items-center p-1.5 mr-2 mb-2 bg-emerald-500 rounded text-sm text-white"
            >
              {tag}
              <span
                className="flex items-center justify-center w-4 h-4 ml-2 bg-white rounded-full text-black text-base cursor-pointer"
                onClick={() => removeTag(tag)}
              >
                &times;
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TagForm;
