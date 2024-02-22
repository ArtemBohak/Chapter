import { CommentValues } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export type CommentsProps = {
  comments: Array<CommentValues> | [];
  setId: Dispatch<SetStateAction<number | string | null>>;
  setNickName: Dispatch<SetStateAction<string>>;
  setReplyToUserId: Dispatch<SetStateAction<number | string | null>>;
  showAllComments: boolean;
  postId: string | number;
};
