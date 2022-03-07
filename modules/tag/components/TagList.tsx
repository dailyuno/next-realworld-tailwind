import Link from "next/link";
import ErrorMessage from "~/common/components/util/ErrorMessage";
import PreLoader from "~/common/components/util/PreLoader";
import useTagList from "../hooks/useTagList";

const TagList: React.FC = () => {
  const { data, error } = useTagList();

  if (error) return <ErrorMessage />;
  if (!data) return <PreLoader />;

  const { tags } = data;

  return (
    <div className="flex flex-wrap p-4 bg-gray-200 rounded">
      <h2 className="text-base font-medium mb-2">인기 태그 목록</h2>
      <div className="flex flex-wrap">
        {tags.map((tag: string) => {
          return (
            <Link key={tag} href={`/?tag=${tag}`}>
              <a className="p-2 mr-2 mb-2 bg-gray-400 text-xs rounded text-white">
                <span>{tag}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TagList;
