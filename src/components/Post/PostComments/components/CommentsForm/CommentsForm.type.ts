import { Dispatch, SetStateAction } from "react";
import { PostCommentsProps } from "../../PostComments.type";

export type CommentsFormProps = {
  setCommentsIsHide?: Dispatch<SetStateAction<boolean>>;
  commentId: string | number | null;
  setCommentId: Dispatch<SetStateAction<string | number | null>>;
  nickName?: string;
  replyToUserId?: string | number | null;
} & Required<Pick<PostCommentsProps, "postId">> &
  Pick<PostCommentsProps, "setFeeds">;

export type FormValues = { text: string };

export type BodyValues = {
  id?: string | number | null;
  nickName?: string;
} & FormValues;
