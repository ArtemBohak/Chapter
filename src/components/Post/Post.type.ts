import { IPost } from "@/src/types";

export type PostProps = {
  pageVariant: "post" | "feed";
  fetchData?: (id: string | number) => void;
} & IPost;
