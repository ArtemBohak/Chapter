import { PostProps } from "../Post.type";

export type PostCommentsProps = Pick<
  PostProps,
  "id" | "totalComments" | "fetchData"
>;
