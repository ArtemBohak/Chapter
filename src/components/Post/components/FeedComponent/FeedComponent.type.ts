import { IPost } from "@/src/types";
import { MutableRefObject, RefObject } from "react";

export type FeedComponentProps = {
  nodeRef: MutableRefObject<null> | RefObject<HTMLDivElement>;
  fetchData?: (id: string | number) => void;
} & IPost;
