import { Dispatch, SetStateAction } from "react";
import { IPostProps } from "../Post.type";
import { IPost } from "@/src/types";

export type PostCommentsProps = {
  commentsIsHide: boolean;
  setCommentsIsHide: Dispatch<SetStateAction<boolean>>;
  setPosts?: Dispatch<SetStateAction<Array<IPost>>>;
  setPost?: Dispatch<SetStateAction<IPost | null>>;
} & Required<Pick<IPostProps, "postId" | "commentsCount" | "comments">>;
