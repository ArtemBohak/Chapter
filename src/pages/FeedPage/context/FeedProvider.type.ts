import { ReactNode } from "react";
import { IPost } from "@/src/types";

export interface IFeedProviderProps {
  children: ReactNode;
}

export type FeedContextType = {
  feeds: Array<IPost> | [];
  isLoad: boolean;
  page: number;
  feedApi: () => void;
};

export type Feeds = Array<IPost> | [];
