import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export type CommentFieldProps = {
  classNames?: string;
  name: string;
} & Partial<
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
>;
