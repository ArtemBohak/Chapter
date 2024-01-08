import { Dispatch, SetStateAction } from "react";
import { PostProps } from "../../Post.type";

export type CommentsButtonProps = {
  textValue: string;
  hiddenText?: boolean;
  setCommentsIsHide?: Dispatch<SetStateAction<boolean>>;
  setId?: Dispatch<SetStateAction<string | number | null>>;
} & Required<Pick<PostProps, "commentsCount">> & { id: string | number };
