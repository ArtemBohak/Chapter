import { Dispatch, SetStateAction } from "react";
import { PostCommentsProps } from "../../PostComments.type";

export type FormProps = Pick<PostCommentsProps, "id" | "fetchData"> & {
  setCommentsIsHide: Dispatch<SetStateAction<boolean>>;
};
