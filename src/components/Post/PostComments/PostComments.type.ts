import { Dispatch, SetStateAction } from "react";
import { PostProps } from "../Post.type";
import { IPost } from "@/src/types";

export type PostCommentsProps = {
  commentsIsHide: boolean;
  setCommentsIsHide: Dispatch<SetStateAction<boolean>>;
  setPosts: Dispatch<SetStateAction<Array<IPost>>>;
} & Required<Pick<PostProps, "postId" | "commentsCount" | "comments">>;
