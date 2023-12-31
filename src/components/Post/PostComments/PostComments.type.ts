import { Dispatch, SetStateAction } from "react";
import { PostProps } from "../Post.type";

export type PostCommentsProps = Required<
  Pick<PostProps, "postId" | "commentsCount" | "comments">
> & {
  commentsIsHide?: boolean;
  setCommentsIsHide?: Dispatch<SetStateAction<boolean>>;
};
