import { Dispatch, ReactNode, SetStateAction } from "react";
import { PostRefType, PostType } from "@/src/types";

export interface IFeedProviderProps {
  children: ReactNode;
}

export type Posts = Array<PostType> | [];

export type FeedContextType = {
  posts: Array<PostRefType>;
  isLoad: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPosts: Dispatch<SetStateAction<Array<PostRefType>>>;
};
