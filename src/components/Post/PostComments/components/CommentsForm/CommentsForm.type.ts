import { Dispatch, SetStateAction } from "react";
import { PostCommentsProps } from "../../PostComments.type";

export type CommentsFormProps = {
  commentId: string | number | null;
  nickName?: string;
  replyToUserId?: string | number | null;
  setNickName?: Dispatch<SetStateAction<string>>;
  setReplyToUserId?: Dispatch<SetStateAction<string | null | number>>;
  setCommentsIsHide?: Dispatch<SetStateAction<boolean>>;
  setCommentId: Dispatch<SetStateAction<string | number | null>>;
} & Required<Pick<PostCommentsProps, "postId">> &
  Pick<PostCommentsProps, "setFeeds">;

export type FormValues = { text: string };

export type BodyValues = {
  replyTo?: { id: string | number | null; nickName: string };
} & FormValues;
