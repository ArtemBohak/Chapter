import { Dispatch, ReactNode, SetStateAction } from "react";
import { IPost } from "@/src/types";
import { FeedsTypes } from "@/src/services/PostApi/PostApi.type";

export interface IFeedProviderProps {
  children: ReactNode;
}

export type Feeds = Array<IPost> | [];

export type FeedContextType = {
  feeds: FeedsTypes;
  isLoad: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setFeeds: Dispatch<SetStateAction<FeedsTypes>>;
};
