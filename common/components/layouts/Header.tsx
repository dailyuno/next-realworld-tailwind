import Link from "next/link";
import Router from "next/router";
import { MouseEvent } from "react";
import { mutate } from "swr";
import useUser from "~/modules/user/hooks/useUser";

const Header: React.FC = () => {
  const loginUser = useUser();

  const handleLogout = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.removeItem("user");
    mutate("user", null);
    Router.push("/");
  };

  return (
    <header className="bg-slate-700">
      <div className="container m-auto">
        <div className="flex justify-between">
          <div className="py-4">
            <Link href="/">
              <a className="text-xl text-white font-medium">
                Next & Tailwind Blog
              </a>
            </Link>
          </div>
          <ul className="flex items-center">
            {!loginUser.isLoggedIn && (
              <>
                <li className="pl-4">
                  <Link href="/user/login">
                    <a className="text-sm text-gray-100">로그인</a>
                  </Link>
                </li>
                <li className="pl-4">
                  <Link href="/user/register">
                    <a className="text-sm text-gray-100">회원가입</a>
                  </Link>
                </li>
              </>
            )}

            {loginUser.isLoggedIn && (
              <>
                <li className="pl-4">
                  <span className="text-sm text-gray-100">
                    {loginUser.username}
                  </span>
                </li>
                <li className="pl-4">
                  <a
                    href="#"
                    className="text-sm text-gray-100"
                    onClick={handleLogout}
                  >
                    로그아웃
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
