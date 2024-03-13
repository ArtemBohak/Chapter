import { Dispatch, SetStateAction } from "react";
import { IPost } from "../../Post.type";
import { PostType } from "@/src/types";

export type PostCommentsProps = {
  commentsIsHide: boolean;
  setCommentsIsHide: Dispatch<SetStateAction<boolean>>;
  setPosts?: Dispatch<SetStateAction<Array<PostType>>>;
  setPost?: Dispatch<SetStateAction<PostType | null>>;
} & Required<Pick<IPost, "postId" | "commentsCount" | "comments">>;
