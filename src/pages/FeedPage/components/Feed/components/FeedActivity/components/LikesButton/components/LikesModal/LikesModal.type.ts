import { Dispatch, SetStateAction } from "react";
import { FeedActivityProps } from "../../../../FeedActivity.type";

export type LikesModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
} & Pick<FeedActivityProps, "totalLikes">;
