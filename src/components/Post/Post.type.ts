import { IPost } from "@/src/types";
import { MutableRefObject, RefObject } from "react";

export type PostProps = {
  pageVariant: "feed";
  nodeRef: MutableRefObject<null> | RefObject<HTMLDivElement>;
  fetchData?: (id: string | number) => void;
} & IPost;
