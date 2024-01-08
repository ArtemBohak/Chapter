import { FC, useCallback, useEffect, useState } from "react";

import { FeedApi } from "../utils/FeedApi";

import { useErrorBoundary } from "@/src/hooks";
import { FeedContext } from "./hooks/useFeedContext";
import { Feeds, IFeedProviderProps } from "./FeedProvider.type";

const FeedProvider: FC<IFeedProviderProps> = ({ children }) => {
  const [feeds, setFeeds] = useState<Feeds>([]);
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);
  const setErrorBoundary = useErrorBoundary();

  const feedApi = useCallback(
    () =>
      new FeedApi(setFeeds, setIsLoad, setErrorBoundary, setPage).getFeeds(
        page
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [page]
  );

  useEffect(() => {
    feedApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FeedContext.Provider
      value={{
        feeds,
        isLoad,
        page,
        feedApi,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedProvider;
