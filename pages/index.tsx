import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PostList from "~/modules/post/components/PostList";
import TagList from "~/modules/tag/components/TagList";
import useUser from "~/modules/user/hooks/useUser";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const user = useUser();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex">
        <div className="w-9/12">
          <PostList />
        </div>

        <div className="w-3/12 px-4">
          <TagList />

          <div className="mt-4 flex justify-end">
            {user.isLoggedIn && (
              <Link href="/post/create">
                <a className="px-6 py-3 rounded bg-blue-600 text-sm text-white">
                  글작성
                </a>
              </Link>
            )}
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
