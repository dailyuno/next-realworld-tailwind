import { useRouter } from "next/router";
import useSWR from "swr";
import ErrorMessage from "~/common/components/util/ErrorMessage";
import PreLoader from "~/common/components/util/PreLoader";
import { API_BASE_URL } from "~/common/utils/constants";
import fetcher from "~/common/utils/fetcher";
import { getQuery } from "~/common/utils/getQuery";
import Pagination from "~/modules/pagination/components/Pagination";
import { Post } from "../types/post";
import PostPreview from "./PostPreview";

interface PostListProps {
  limit?: number;
}

const PostList: React.FC<PostListProps> = ({ limit = 10 }: PostListProps) => {
  const router = useRouter();
  const { query } = router;
  const { tag, page } = query;
  const currentPage = Number(page) || 1;

  let url = `${API_BASE_URL}/articles?${getQuery(limit, currentPage - 1)}`;

  if (!!tag) {
    url += `&tag=${tag}`;
  }

  const { data, error } = useSWR(url, fetcher);

  if (error) return <ErrorMessage />;
  if (!data) return <PreLoader />;

  const {
    articles,
    articlesCount,
  }: {
    articles: Post[];
    articlesCount: number;
  } = data;

  return (
    <div>
      {articles.map((article) => {
        return <PostPreview key={article.slug} post={article} />;
      })}

      <div className="mb-4">
        <Pagination
          total={articlesCount}
          limit={limit}
          currentPage={currentPage}
          pageCount={5}
        />
      </div>
    </div>
  );
};

export default PostList;
