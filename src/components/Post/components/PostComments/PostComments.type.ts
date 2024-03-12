import { Dispatch, SetStateAction } from "react";
import { IPostProps } from "../../Post.type";
import { PostType } from "@/src/types";

export type PostCommentsProps = {
  commentsIsHide: boolean;
  setCommentsIsHide: Dispatch<SetStateAction<boolean>>;
  setPosts?: Dispatch<SetStateAction<Array<PostType>>>;
  setPost?: Dispatch<SetStateAction<PostType | null>>;
} & Required<Pick<IPostProps, "postId" | "commentsCount" | "comments">>;
