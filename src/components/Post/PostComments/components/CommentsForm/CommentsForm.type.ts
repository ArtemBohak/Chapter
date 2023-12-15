import { Dispatch, SetStateAction } from "react";
import { PostCommentsProps } from "../../PostComments.type";

export type CommentsFormProps = {
  setCommentsIsHide: Dispatch<SetStateAction<boolean>>;
} & Required<Pick<PostCommentsProps, "id">> &
  Pick<PostCommentsProps, "fetchData">;

export type FormValues = { comments: string };
