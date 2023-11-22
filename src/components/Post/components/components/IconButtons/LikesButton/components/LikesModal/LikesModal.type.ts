import { Dispatch, SetStateAction } from "react";
import { FeedComponentProps } from "@/src/components/Post/components/FeedComponent/FeedComponent.type";

export type Like = Pick<
  FeedComponentProps,
  "avatar" | "firstName" | "lastName" | "id" | "likesList" | "fetchData"
>;

export type LikesModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  likesData: Array<Like>;
  title?: string;
} & Pick<FeedComponentProps, "totalLikes" | "fetchData">;
