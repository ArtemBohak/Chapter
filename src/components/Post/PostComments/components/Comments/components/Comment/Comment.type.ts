import { CommentValues, RefsType } from "@/src/types";
import { CommentsProps } from "../../Comments.type";

export type CommentProps = {
  hideCommentBtn?: boolean;
} & Required<
  Pick<
    CommentsProps,
    "postId" | "setPage" | "handleNickname" | "setAllComments"
  >
> &
  Pick<CommentsProps, "setPosts" | "setPost"> &
  CommentValues &
  RefsType;
