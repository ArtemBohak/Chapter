import { FC, useEffect, useState } from "react";

import { useErrorBoundary } from "@/src/hooks";
import { FeedContext } from "./hooks/useFeedContext";
import { FeedsTypes, IFeedProviderProps } from "./FeedProvider.type";
import { PostApi } from "@/src/services";

const FeedProvider: FC<IFeedProviderProps> = ({ children }) => {
  const [feeds, setFeeds] = useState<FeedsTypes>([]);
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);

  const setErrorBoundary = useErrorBoundary();

  useEffect(() => {
    new PostApi(setIsLoad, setErrorBoundary, setFeeds).get(page);

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
