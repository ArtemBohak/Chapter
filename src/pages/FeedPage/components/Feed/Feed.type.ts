import { IPost } from "@/src/types";
import { MutableRefObject, RefObject } from "react";

export type FeedProps = {
  nodeRef: MutableRefObject<null> | RefObject<HTMLDivElement>;
  loaderRef?: MutableRefObject<null> | RefObject<HTMLInputElement>;
  pageValue?: number;
} & IPost;
