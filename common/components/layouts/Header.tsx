import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-slate-700">
      <div className="container m-auto">
        <div className="flex justify-between">
          <div className="py-4">
            <Link href="/">
              <a className="text-xl text-white">Next & Tailwind Blog</a>
            </Link>
          </div>
          <ul className="flex items-center">
            <li className="pl-4">
              <Link href="/">
                <a className="text-sm text-gray-100">로그인</a>
              </Link>
            </li>
            <li className="pl-4">
              <Link href="/">
                <a className="text-sm text-gray-100">회원가입</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
