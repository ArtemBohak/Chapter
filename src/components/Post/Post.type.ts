import { IPost } from "@/src/types";
import { MutableRefObject, RefObject } from "react";

export type PostProps = {
  pageVariant: "post" | "feed";
  fetchData?: (id: string | number) => void;
  nodeRef?: MutableRefObject<null>;
  feedRef?: RefObject<HTMLElement | unknown>;
} & IPost;
