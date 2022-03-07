export interface GetPageInfoProps {
  total: number;
  limit: number;
  currentPage: number;
  pageCount: number;
}

export interface GetPageInfoResponse {
  totalPage: number;
  from: number;
  to: number;
  previousPage: number;
  nextPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const getPageInfo = ({
  total,
  limit,
  pageCount,
  currentPage,
}: GetPageInfoProps): GetPageInfoResponse => {
  const totalPage = Math.ceil(total / limit);
  const from = Math.floor((currentPage - 1) / pageCount) * pageCount + 1;
  const to = from * pageCount > totalPage ? totalPage : from * pageCount;
  const previousPage = from - 1;
  const nextPage = to + 1;
  const hasPreviousPage = previousPage > 0;
  const hasNextPage = nextPage <= totalPage;

  return {
    totalPage,
    from,
    to,
    previousPage,
    nextPage,
    hasPreviousPage,
    hasNextPage,
  };
};

export const getPageRange = (from: number, to: number): number[] => {
  return [...Array(to - from + 1)].map((_, idx) => from + idx);
};
