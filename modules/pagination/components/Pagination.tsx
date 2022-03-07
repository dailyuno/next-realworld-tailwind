import Router, { useRouter } from "next/router";
import { MouseEvent, useCallback } from "react";
import { getPageInfo, getPageRange } from "../utils/paginate";

interface PaginationProps {
  total: number;
  limit: number;
  currentPage: number;
  pageCount: number;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  currentPage,
  pageCount,
}: PaginationProps) => {
  const router = useRouter();
  const { pathname, query } = router;

  const { from, to, previousPage, nextPage, hasPreviousPage, hasNextPage } =
    getPageInfo({ total, limit, currentPage, pageCount });
  const pages = getPageRange(from, to);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, index: number) => {
      e.preventDefault();
      Router.replace({
        pathname: pathname,
        query: {
          ...query,
          page: index,
        },
      });
    },
    [pathname, query]
  );

  return (
    <div>
      <ul className="flex">
        <li>
          <a
            href="#"
            className={`py-2 px-4 mr-2 text-sm rounded border border-solid border-gray-200 ${
              !hasPreviousPage ? "cursor-not-allowed bg-gray-200" : "bg-white"
            }`}
            onClick={(e) => handleClick(e, previousPage)}
          >
            {`<<`}
          </a>
        </li>
        {pages.map((page) => {
          return (
            <li key={page}>
              <a
                href="#"
                className={`py-2 px-4 mr-2 text-sm rounded border border-solid ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-gray-200"
                }`}
                onClick={(e) => handleClick(e, page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li>
          <a
            href="#"
            className={`py-2 px-4 mr-2 text-sm rounded border border-solid border-gray-200 ${
              !hasNextPage ? "cursor-not-allowed bg-gray-200" : "bg-white"
            }`}
            onClick={(e) => handleClick(e, nextPage)}
          >
            {`>>`}
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
