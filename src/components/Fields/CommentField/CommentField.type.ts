import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export type CommentFieldProps = {
  classNames?: string;
  iconSize?: number;
  labelValue?: string;
  emojiClassNames?: string;
  name: string;
} & Partial<
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
>;

export interface IEmoji {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
}
