import { CommentValues } from "@/src/types";
import { CommentsProps } from "../../Comments.type";

export type CommentProps = {
  hideCommentBtn?: boolean;
} & CommentValues &
  Required<
    Pick<CommentsProps, "setId" | "setNickName" | "setReplyToUserId" | "postId">
  >;
