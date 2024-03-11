import { Dispatch, ReactNode, SetStateAction } from "react";
import { IPost } from "@/src/types";
import { PostRefType } from "@/src/types";

export interface IFeedProviderProps {
  children: ReactNode;
}

export type Posts = Array<IPost> | [];

export type FeedContextType = {
  posts: Array<PostRefType>;
  isLoad: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPosts: Dispatch<SetStateAction<Array<PostRefType>>>;
};
