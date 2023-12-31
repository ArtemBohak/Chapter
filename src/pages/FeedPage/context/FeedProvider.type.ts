import { Dispatch, ReactNode, SetStateAction } from "react";
import { IPost } from "@/src/types";

export interface IFeedProviderProps {
  children: ReactNode;
}

export type FeedContextType = {
  setPage: Dispatch<SetStateAction<number>>;
  feeds: Array<IPost> | [];
  isLoad: boolean;
};

export type Feeds = Array<IPost> | [];
