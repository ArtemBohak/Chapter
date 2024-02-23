import { FC, useEffect, useState } from "react";

import { useErrorBoundary } from "@/src/hooks";
import { PostApi } from "@/src/services";
import { FeedContext } from "./hooks/useFeedContext";
import { IFeedProviderProps } from "./FeedProvider.type";
import { FeedsTypes } from "@/src/services/PostApi/PostApi.type";

const FeedProvider: FC<IFeedProviderProps> = ({ children }) => {
  const [feeds, setFeeds] = useState<FeedsTypes>([]);
  const [page, setPage] = useState(0);
  const [isLoad, setIsLoad] = useState(false);

  const setErrorBoundary = useErrorBoundary();

  useEffect(() => {
    if (page) new PostApi(setErrorBoundary, setIsLoad, setFeeds).get(page);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <FeedContext.Provider
      value={{
        feeds,
        isLoad,
        page,
        setPage,
        setFeeds,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedProvider;
