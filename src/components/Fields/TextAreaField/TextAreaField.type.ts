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
  replyToUserId?: string | number | null;
  nickName?: string;
  setNickName?: Dispatch<SetStateAction<string>>;
  setReplyToUserId?: Dispatch<SetStateAction<string | null | number>>;
} & Partial<TextareaHTMLAttributes<HTMLTextAreaElement>>;

export interface IEmoji {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
}
