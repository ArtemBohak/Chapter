import { CommentValues } from "@/src/types";
import { CommentsProps } from "../../Comments.type";
import { RefsType } from "@/src/utils/callBacks/callBacks.type";

export type CommentProps = {
  hideCommentBtn?: boolean;
} & CommentValues &
  Required<Pick<CommentsProps, "postId" | "setPage" | "handleNickname">> &
  Pick<CommentsProps, "setFeeds"> &
  RefsType;
