import { CommentValues, IPost } from "@/src/types";
import { MutableRefObject, RefObject } from "react";

export type RefsType = {
  nodeRef?: MutableRefObject<null> | RefObject<HTMLDivElement>;
  loaderRef?: MutableRefObject<null> | RefObject<HTMLInputElement>;
  pageValue?: number;
};

export type Feeds = Array<IPost> | [];

export type Comments = Array<CommentValues> | [];

export type FeedsTypes = Array<IPost & RefsType> | [];

export type CommentsTypes = Array<CommentValues & RefsType> | [];
