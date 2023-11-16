import { Dispatch, SetStateAction } from "react";
import { PostProps } from "@/src/components/Post/Post.type";

export type Like = Pick<
  PostProps,
  "avatar" | "firstName" | "lastName" | "id" | "likesList" | "fetchData"
>;

export type LikesModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  likesData: Array<Like>;
  title?: string;
} & Pick<PostProps, "totalLikes" | "fetchData">;
