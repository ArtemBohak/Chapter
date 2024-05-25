import { Dispatch, SetStateAction } from "react";
import { CommentRefType } from "@/src/types";
import { PostProps } from "../../../Post.type";

export type DeleteButtonProps = {
  authorId: string | number;
  commentId: string | number;
  postAuthor: string | number;
  setAllComments: Dispatch<SetStateAction<Array<CommentRefType>>>;
} & Pick<PostProps, "setPosts" | "setPost">;
