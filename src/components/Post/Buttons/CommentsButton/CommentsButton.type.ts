import { Dispatch, SetStateAction } from "react";
import { IPostProps } from "../../Post.type";
import { HandleNickname } from "@/src/types";

export type CommentsButtonProps = {
  textValue: string;
  hiddenText?: boolean;
  postId: string | number;
  id: string | number;
  authorId?: string | number | null;
  setCommentsIsHide?: Dispatch<SetStateAction<boolean>>;
  handleNickname?: HandleNickname;
} & Required<Pick<IPostProps, "commentsCount">> &
  Pick<IPostProps, "nickName">;
