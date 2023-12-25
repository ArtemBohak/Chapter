import { PostProps } from "../Post.type";

export type PostCommentsProps = Required<
  Pick<PostProps, "postId" | "commentsCount" | "fetchData" | "comments">
>;
