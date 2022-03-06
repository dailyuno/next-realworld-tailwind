import { createContext, Dispatch, useContext, useState } from "react";

const PageStateContext = createContext<number | undefined>(undefined);

export const usePageState = () => {
  const state = useContext(PageStateContext);
  return state;
};

export type PageDispatch = Dispatch<number>;

const PageDispatchContext = createContext<PageDispatch | undefined>(undefined);

export const usePageDispatch = () => {
  const dispatch = useContext(PageDispatchContext);
  return dispatch;
};

interface Props {
  children: React.ReactNode;
}

const PageContextProvider = ({ children }: Props) => {
  const [page, setPage] = useState(0);

  return (
    <PageDispatchContext.Provider value={setPage}>
      <PageStateContext.Provider value={page}>
        {children}
      </PageStateContext.Provider>
    </PageDispatchContext.Provider>
  );
};

export default PageContextProvider;
