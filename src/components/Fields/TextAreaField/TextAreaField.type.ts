import { HandleNickname } from "@/src/types";
import { Dispatch, SetStateAction, TextareaHTMLAttributes } from "react";

export type TextAreaFieldProps = {
  id: string;
  placeholder: string;
  name: string;
  value: string;
  dataAutomation: string;
  iconSize?: number;
  classNames?: string;
  emojiClassNames?: string;
  labelValue?: string;
  nickName?: string;
  commentText?: string | null;
  setCommentText?: Dispatch<SetStateAction<string | null>>;
  handleNickname?: HandleNickname;
} & Partial<TextareaHTMLAttributes<HTMLTextAreaElement>>;

export interface IEmoji {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
}
