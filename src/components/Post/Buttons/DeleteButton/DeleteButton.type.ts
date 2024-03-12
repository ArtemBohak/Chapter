import { Dispatch, SetStateAction } from "react";
import { CommentRefType, PostType } from "@/src/types";

export type DeleteButtonProps = {
  authorId: string | number;
  commentId: string | number;
  setPosts?: Dispatch<SetStateAction<Array<PostType>>>;
  setPost?: Dispatch<SetStateAction<PostType | null>>;
  setAllComments: Dispatch<SetStateAction<Array<CommentRefType>>>;
};
