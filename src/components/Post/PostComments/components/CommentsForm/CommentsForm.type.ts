import { Dispatch, SetStateAction } from "react";
import { PostCommentsProps } from "../../PostComments.type";
import { HandleNickname } from "@/src/types";

export type CommentsFormProps = {
  commentId: string | number | null;
  nickName?: string;
  replyToUserId?: string | number | null;
  handleNickname: HandleNickname;
  setCommentsIsHide?: Dispatch<SetStateAction<boolean>>;
} & Required<Pick<PostCommentsProps, "postId">> &
  Pick<PostCommentsProps, "setFeeds">;

export type FormValues = { text: string };

export type BodyValues = {
  recipientId?: string | number;
  recipientNickName?: string;
} & FormValues;
