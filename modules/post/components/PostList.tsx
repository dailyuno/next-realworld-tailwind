import { useRouter } from "next/router";
import useSWR from "swr";
import ErrorMessage from "~/common/components/util/ErrorMessage";
import PreLoader from "~/common/components/util/PreLoader";
import { API_BASE_URL } from "~/common/utils/constants";
import fetcher from "~/common/utils/fetcher";
import { getQuery } from "~/common/utils/getQuery";
import { Post } from "../types/post";
import PostPreview from "./PostPreview";

const PostList: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const { tag } = query;

  let url = `${API_BASE_URL}/articles`;

  if (!!tag) {
    url = `${API_BASE_URL}/articles?tag=${tag}`;
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
    </div>
  );
};

export default PostList;
