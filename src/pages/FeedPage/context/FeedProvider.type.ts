import { ReactNode } from "react";
import { Feed } from "../FeedPage.types";

export interface IFeedProviderProps {
  children: ReactNode;
}

export type FeedContextType = {
  fetchData: (id: string | number) => void;
  feeds: Array<Feed>;
};
