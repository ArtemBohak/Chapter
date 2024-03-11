import { Dispatch, SetStateAction } from "react";
import { PostProps } from "../../Post.type";
import { HandleNickname } from "@/src/types";

export type CommentsButtonProps = {
  textValue: string;
  hiddenText?: boolean;
  postId: string | number;
  id: string | number;
  authorId?: string | number | null;
  setCommentsIsHide?: Dispatch<SetStateAction<boolean>>;
  handleNickname?: HandleNickname;
} & Required<Pick<PostProps, "commentsCount">> &
  Pick<PostProps, "nickName">;
