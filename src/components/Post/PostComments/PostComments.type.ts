import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { PostProps } from "../Post.type";
import { CommentValues, IPost } from "@/src/types";

export type PostCommentsProps = {
  commentsIsHide?: boolean;
  setCommentsIsHide?: Dispatch<SetStateAction<boolean>>;
  setFeeds?: Dispatch<SetStateAction<Array<IPost>>>;
} & Required<Pick<PostProps, "postId" | "commentsCount" | "comments">>;

export type CommentsRef = {
  loaderRef?: MutableRefObject<null> | RefObject<HTMLInputElement>;
  pageValue?: number;
};

export type CommentsType = Array<CommentValues & CommentsRef> | [];
