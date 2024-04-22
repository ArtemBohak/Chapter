import { CommentType, PostRefType, RefType } from "@/src/types";
import { Dispatch, SetStateAction } from "react";

export interface UserPostProps {
  post: PostRefType;
  setPage?: Dispatch<SetStateAction<number>>;
  setPosts?: Dispatch<SetStateAction<Array<PostRefType>>>;
  nodeRef: RefType | undefined
}

export type PostData = {
  postId: number;
  imgUrl: string;
  title: string;
  caption: string;
  createAt: string;
  updatedAt: string;
  commentsCount: number;
  comments: Array<CommentType> | [];
  userIds: number[]
  author: {
    id: number;
    nickName: string;
    avatar: string;
    firstName: string;
    lastName: string;
  }
  isSubscribeToAuthor: boolean;
}