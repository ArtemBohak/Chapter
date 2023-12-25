import { PostProps } from "../../Post.type";

export type CommentsButtonProps = {
  textValue: string;
  hiddenText?: boolean;
} & Required<Pick<PostProps, "commentsCount" | "postId">> &
  Pick<PostProps, "fetchData">;
