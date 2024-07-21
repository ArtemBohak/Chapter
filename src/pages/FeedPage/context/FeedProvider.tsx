import { FC, useCallback, useEffect, useState } from "react";

import { useErrorBoundary } from "@/src/hooks";
import { PostApi } from "@/src/services";
import { FeedContext } from "./hooks/useFeedContext";
import { IFeedProviderProps } from "./FeedProvider.type";
import { PostRefType } from "@/src/types";

const FeedProvider: FC<IFeedProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Array<PostRefType>>([]);
  const [page, setPage] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const setErrorBoundary = useErrorBoundary();

  const postsApi = useCallback(
    () => new PostApi(setPosts, setErrorBoundary, setIsLoad).get(page),
    [page, setErrorBoundary]
  );

  useEffect(() => {
    if (page) postsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <FeedContext.Provider
      value={{
        posts,
        isLoad,
        page,
        setPage,
        setPosts,
        postsApi,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedProvider;
