import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  RefObject,
  SetStateAction,
} from "react";
import { IPost } from "@/src/types";

export interface IFeedProviderProps {
  children: ReactNode;
}

export type RefsType = {
  nodeRef?: MutableRefObject<null> | RefObject<HTMLDivElement>;
  loaderRef?: MutableRefObject<null> | RefObject<HTMLInputElement>;
  pageValue?: number;
};

export type Feeds = Array<IPost> | [];

export type FeedsTypes = Array<IPost & RefsType> | [];

export type FeedContextType = {
  feeds: FeedsTypes;
  isLoad: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setFeeds: Dispatch<SetStateAction<FeedsTypes>>;
};
