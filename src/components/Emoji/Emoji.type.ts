import { Dispatch, SetStateAction } from "react";

export interface IEmoji {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
}

export type EmojiProps = {
  showEmojiPicker: boolean;
  iconSize?: number;
  buttonClassNames?: string;
  emojiClassNames?: string;
  setShowEmojiPicker: Dispatch<SetStateAction<boolean>>;
  handleEmojiClick: (emoji: IEmoji) => void;
};
