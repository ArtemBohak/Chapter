import { Dispatch, SetStateAction } from "react";
import { PostCommentsProps } from "../../PostComments.type";

export type CommentsFormProps = {
  setCommentsIsHide?: Dispatch<SetStateAction<boolean>>;
  commentId: string | number | null;
  nickName: string;
  setNickName: Dispatch<SetStateAction<string>>;
  setCommentId: Dispatch<SetStateAction<string | number | null>>;
} & Required<Pick<PostCommentsProps, "postId">>;

export type FormValues = { text: string };
