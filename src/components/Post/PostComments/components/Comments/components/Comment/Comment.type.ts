import { CommentValues, RefsType } from "@/src/types";
import { CommentsProps } from "../../Comments.type";

export type CommentProps = {
  hideCommentBtn?: boolean;
} & CommentValues &
  Required<Pick<CommentsProps, "postId" | "setPage" | "handleNickname">> &
  Pick<CommentsProps, "setPosts"> &
  RefsType;
