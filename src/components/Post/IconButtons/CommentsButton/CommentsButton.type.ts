import { Dispatch, SetStateAction } from "react";
import { PostProps } from "../../Post.type";

export type CommentsButtonProps = {
  textValue: string;
  hiddenText?: boolean;
  setCommentsIsHide?: Dispatch<SetStateAction<boolean>>;
  setId?: Dispatch<SetStateAction<string | number | null>>;
  setNickName?: Dispatch<SetStateAction<string>>;
  setReplyToUserId?: Dispatch<SetStateAction<string | number | null>>;
} & Required<Pick<PostProps, "commentsCount">> &
  Pick<PostProps, "nickName"> & {
    id: string | number;
    authorId?: string | number | null;
  };
