import { FC, useEffect, useState } from "react";

import { FeedApi } from "../utils/FeedApi";

import { useErrorBoundary } from "@/src/hooks";
import { FeedContext } from "./hooks/useFeedContext";
import { Feeds, IFeedProviderProps } from "./FeedProvider.type";

const FeedProvider: FC<IFeedProviderProps> = ({ children }) => {
  const [feeds, setFeeds] = useState<Feeds>([]);
  const [page, setPage] = useState(1);
  const [isLoad, setIsLoad] = useState(false);
  const setErrorBoundary = useErrorBoundary();

  useEffect(() => {
    new FeedApi(setFeeds, setIsLoad, setErrorBoundary).getFeeds(page);
  }, [page, setErrorBoundary]);

  return (
    <FeedContext.Provider
      value={{
        feeds,
        isLoad,
        page,
        setPage,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedProvider;
