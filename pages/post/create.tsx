import { NextPage } from "next";
import Head from "next/head";
import PostForm from "~/modules/post/components/PostForm";

const CreatePost: NextPage = () => {
  return (
    <>
      <Head>
        <title>글 작성 | Next & Tailwind Blog</title>
        <meta name="description" content="글 작성 페이지입니다" />
      </Head>
      <div className="container m-auto py-16">
        <h2 className="font-medium text-3xl text-center">글 작성</h2>
        <PostForm />
      </div>
    </>
  );
};

export default CreatePost;
