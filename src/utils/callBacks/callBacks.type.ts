import { MutableRefObject, RefObject } from "react";

import { CommentValues, IPost } from "@/src/types";

export type RefsType = {
  nodeRef?: MutableRefObject<null> | RefObject<HTMLDivElement>;
  loaderRef?: MutableRefObject<null> | RefObject<HTMLInputElement>;
  pageValue?: number;
};

export type FeedType = IPost;
export type FeedRefType = FeedType & RefsType;

export type CommentType = CommentValues;
export type CommentRefType = CommentType & RefsType;
