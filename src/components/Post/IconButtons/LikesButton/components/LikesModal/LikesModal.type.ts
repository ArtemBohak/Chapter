import { Dispatch, SetStateAction } from "react";
import { PostProps } from "@/src/components/Post/Post.type";
import { Author } from "@/src/types";

export type Like = Required<Pick<PostProps, "isSubscribeToAuthor">> &
  Required<
    Pick<
      Author,
      "avatar" | "id" | "firstName" | "lastName" | "nickName" | "relativeDate"
    >
  >;

export type LikesModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  likesData: Array<Like>;
  likeCount: number;
  title?: string;
};
