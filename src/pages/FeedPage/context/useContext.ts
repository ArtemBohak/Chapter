import { createContext, useContext } from "react";
import { FeedContextType } from "./FeedProvider.type";

export const FeedContext = createContext<FeedContextType | null>(null);

export const useFeedContext = () => {
  const feedContext = useContext(FeedContext);

  if (!feedContext)
    throw new Error(
      "useFeedContext has to be used within <FeedContext.Provider>"
    );
  return feedContext;
};
