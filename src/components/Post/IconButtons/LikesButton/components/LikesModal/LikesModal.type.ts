import { Dispatch, SetStateAction } from "react";
import { PostProps } from "@/src/components/Post/Post.type";

export type Like = Required<Pick<PostProps, "author" | "usersId">> &
  Pick<PostProps, "fetchData">;

export type LikesModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  likesData: Array<Like>;
  title?: string;
} & Required<Pick<PostProps, "likeCount">> &
  Pick<PostProps, "fetchData">;
