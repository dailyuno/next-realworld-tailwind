import Router, { useRouter } from "next/router";

const ErrorMessage: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    const { pathname } = router;
    Router.push(pathname);
  };

  return (
    <div className="py-16 text-center">
      <div className="flex justify-center">
        <svg
          className="w-16 h-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h2 className="flex flex-col text-3xl mt-8">일시적인 오류입니다.</h2>
      <p className="mt-4 text-base text-gray-600">
        새로 고침을 눌러 페이지를 다시 불러올 수 있습니다.
      </p>
      <button
        className="mt-6 w-36 py-4 bg-blue-500 rounded text-white text-sm"
        onClick={handleClick}
      >
        새로고침
      </button>
    </div>
  );
};

export default ErrorMessage;
