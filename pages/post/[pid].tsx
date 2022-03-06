import { useRouter } from "next/router";
import useSWR from "swr";
import PreLoader from "~/common/components/util/PreLoader";
import { API_BASE_URL } from "~/common/utils/constants";
import fetcher from "~/common/utils/fetcher";
import CommentList from "~/modules/comment/components/CommentList";
import PostMeta from "~/modules/post/components/PostMeta";
import PostTagList from "~/modules/post/components/PostTagList";
import { PostResponseData } from "~/modules/post/types/postResponse";

const PostView: React.FC = () => {
  const router = useRouter();
  const {
    query: { pid },
  } = router;

  const { data } = useSWR(
    `${API_BASE_URL}/articles/${encodeURIComponent(String(pid))}`,
    fetcher
  );

  if (!data) return <PreLoader />;

  const { article }: PostResponseData = data;

  console.log(article);

  return (
    <div className="container m-auto">
      <div className="py-8 border-b border-solid border-gray-200">
        <h2 className="text-3xl font-medium mb-4">{article.title}</h2>
        <PostMeta post={article} />
      </div>
      <div className="py-8 border-b border-solid border-gray-200">
        <div className="mb-8">{article.body}</div>

        <PostTagList tagList={article.tagList} link={false} />
      </div>
      <div className="py-8 border-b border-solid border-gray-200">
        <CommentList />
      </div>
    </div>
  );
};

export default PostView;
