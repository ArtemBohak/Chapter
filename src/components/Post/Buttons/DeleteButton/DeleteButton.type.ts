import { Dispatch, SetStateAction } from "react";
import { CommentRefType, IPost } from "@/src/types";

export type DeleteButtonProps = {
  authorId: string | number;
  commentId: string | number;
  setPosts: Dispatch<SetStateAction<Array<IPost>>>;
  setAllComments: Dispatch<SetStateAction<Array<CommentRefType>>>;
};
