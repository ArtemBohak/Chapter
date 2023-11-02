import { Dispatch, SetStateAction } from "react";
import { FeedActivityProps } from "../../../../FeedActivity/FeedActivity.type";
import { idList } from "@/src/types";

export interface Like {
  avatar: string | null;
  firstName: string;
  lastName: string;
  id: number | string;
  likesList: idList;
}

export type LikesModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  likesData: Array<Like>;
  title?: string;
} & Pick<FeedActivityProps, "totalLikes">;
