import { IPost } from "@/src/types";
import { MutableRefObject } from "react";

export type PostProps = {
  pageVariant: "post" | "feed";
  fetchData?: (id: string | number) => void;
  nodeRef?: MutableRefObject<null>;
} & IPost;
