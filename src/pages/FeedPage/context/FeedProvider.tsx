import { FC, useEffect, useState } from "react";

import { FeedApi } from "../utils/FeedApi";

import { useErrorBoundary } from "@/src/hooks";
import { FeedContext } from "./hooks/useFeedContext";
import { Feeds, IFeedProviderProps } from "./FeedProvider.type";

const FeedProvider: FC<IFeedProviderProps> = ({ children }) => {
  const [feeds, setFeeds] = useState<Feeds>([]);
  const [isLoad, setIsLoad] = useState(false);
  const setErrorBoundary = useErrorBoundary();

  useEffect(() => {
    new FeedApi(setFeeds, setIsLoad, setErrorBoundary).getFeeds();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = (id: string | number) => {
    console.log(id);
  };

  return (
    <FeedContext.Provider
      value={{
        feeds,
        fetchData,
        isLoad,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export default FeedProvider;
