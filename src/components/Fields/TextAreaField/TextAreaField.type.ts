import { HandleNickname } from "@/src/types";
import { TextareaHTMLAttributes } from "react";

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
