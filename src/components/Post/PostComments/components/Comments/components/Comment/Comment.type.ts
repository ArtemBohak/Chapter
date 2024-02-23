import { CommentValues } from "@/src/types";
import { CommentsProps } from "../../Comments.type";
import { RefsType } from "@/src/services/PostApi/PostApi.type";

export type CommentProps = {
  hideCommentBtn?: boolean;
} & CommentValues &
  Required<
    Pick<CommentsProps, "setId" | "setNickName" | "setReplyToUserId" | "postId">
  > &
  RefsType;
