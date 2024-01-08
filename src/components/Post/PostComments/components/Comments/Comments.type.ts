import { CommentValues } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export type CommentsProps = {
  comments: Array<CommentValues> | [];
  setId: Dispatch<SetStateAction<number | string | null>>;
};
