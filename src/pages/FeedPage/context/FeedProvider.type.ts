import { Dispatch, ReactNode, SetStateAction } from "react";
import { IPost } from "@/src/types";

export interface IFeedProviderProps {
  children: ReactNode;
}

export type FeedContextType = {
  feeds: Array<IPost> | [];
  isLoad: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setFeeds: Dispatch<SetStateAction<Array<IPost>>>;
};

export type Feeds = Array<IPost> | [];
