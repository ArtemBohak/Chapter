import { Dispatch, ReactNode, SetStateAction } from "react";
import { IPost } from "@/src/types";

export interface IFeedProviderProps {
  children: ReactNode;
}

export type FeedContextType = {
  feeds: Array<IPost> | [];
  isLoad: boolean;
  page: number;
  // feedApi: () => void;
  setPage: Dispatch<SetStateAction<number>>;
};

export type Feeds = Array<IPost> | [];
