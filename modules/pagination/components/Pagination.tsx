import { MouseEvent, MouseEventHandler, useCallback } from "react";
import { getQuery } from "~/common/utils/getQuery";
import { usePageDispatch, usePageState } from "../context/PageContext";

interface PaginationProps {
  total: number;
  limit: number;
  fetchData: (query: string) => Promise<any>;
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  limit,
  fetchData,
}: PaginationProps) => {
  const page = usePageState();
  const setPage = usePageDispatch();

  const pages = new Array(Math.ceil(total / limit))
    .fill(0)
    .map((page, idx) => page + idx);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>, index: number) => {
      e.preventDefault();

      if (setPage) {
        setPage(index);
        fetchData(getQuery(limit, index));
      }
    },
    [setPage, fetchData, limit]
  );

  return (
    <div>
      <ul>
        {pages.map((page) => {
          return (
            <li key={page}>
              <a href="#" onClick={(e) => handleClick(e, page)}>
                {page + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
