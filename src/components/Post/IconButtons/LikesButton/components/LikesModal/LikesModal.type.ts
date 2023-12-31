import { Dispatch, SetStateAction } from "react";
import { PostProps } from "@/src/components/Post/Post.type";

export type Like = Required<Pick<PostProps, "author" | "userIds">>;

export type LikesModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  likesData: Array<Like>;
  likeCount: number;
  title?: string;
};
