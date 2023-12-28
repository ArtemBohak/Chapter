import { Dispatch, SetStateAction } from "react";
import { PostProps } from "@/src/components/Post/Post.type";

export type Like = Required<Pick<PostProps, "author" | "userIds">> &
  Pick<PostProps, "fetchData">;

export type LikesModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  likesData: Array<Like>;
  likeCount: number;
  title?: string;
} & Pick<PostProps, "fetchData">;
