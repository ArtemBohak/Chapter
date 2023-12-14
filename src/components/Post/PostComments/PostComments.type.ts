import { PostProps } from "../Post.type";

export type PostCommentsProps = Required<
  Pick<PostProps, "id" | "totalComments">
> &
  Pick<PostProps, "fetchData">;
