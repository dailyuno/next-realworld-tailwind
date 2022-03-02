import { NextPage } from "next";
import Head from "next/head";
import RegisterForm from "~/modules/user/components/RegisterForm";

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>회원가입 | Next & Tailwind Blog</title>
        <meta name="description" content="회원가입 페이지입니다." />
      </Head>
      <div className="container m-auto py-16">
        <h2 className="font-medium text-3xl text-center">회원가입</h2>

        <RegisterForm />
      </div>
    </>
  );
};

export default Register;
