import { NextPage } from "next";
import Head from "next/head";
import LoginForm from "~/modules/user/components/LoginForm";

const Login: NextPage = () => {
  return (
    <>
      <Head>
        <title>로그인 | Next & Tailwind Blog</title>
        <meta name="description" content="로그인 페이지입니다" />
      </Head>
      <div className="container m-auto py-16">
        <h2 className="font-medium text-3xl text-center">로그인</h2>

        <LoginForm />
      </div>
    </>
  );
};

export default Login;
