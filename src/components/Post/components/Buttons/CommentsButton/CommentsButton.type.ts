import { Dispatch, SetStateAction } from "react";

import { HandleNickname } from "@/src/types";
import { IPost } from "../../../Post.type";

export type CommentsButtonProps = {
  textValue: string;
  hiddenText?: boolean;
  postId: string | number;
  id: string | number;
  authorId?: string | number | null;
  setCommentsIsHide?: Dispatch<SetStateAction<boolean>>;
  handleNickname?: HandleNickname;
} & Required<Pick<IPost, "commentsCount">> &
  Pick<IPost, "nickName">;
