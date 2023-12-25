import { ReactNode } from "react";
import { IPost } from "@/src/types";

export interface IFeedProviderProps {
  children: ReactNode;
}

export type FeedContextType = {
  fetchData: (id: string | number) => void;
  feeds: Array<IPost> | [];
  isLoad: boolean;
};

export type Feeds = Array<IPost> | [];
