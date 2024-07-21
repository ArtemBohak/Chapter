import { Dispatch, ReactNode, SetStateAction } from "react";
import { PostRefType } from "@/src/types";

export interface IFeedProviderProps {
  children: ReactNode;
}

export type FeedContextType = {
  posts: Array<PostRefType>;
  isLoad: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPosts: Dispatch<SetStateAction<Array<PostRefType>>>;
  postsApi: () => Promise<void>;
};
