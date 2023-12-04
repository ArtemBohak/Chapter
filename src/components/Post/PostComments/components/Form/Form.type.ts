import { Dispatch, SetStateAction } from "react";
import { PostCommentsProps } from "../../PostComments.type";

export type FormProps = {
  setCommentsIsHide: Dispatch<SetStateAction<boolean>>;
} & Required<Pick<PostCommentsProps, "id">> &
  Pick<PostCommentsProps, "fetchData">;
