import { TextareaHTMLAttributes } from "react";

export type TextAreaFieldProps = {
  id: string;
  placeholder: string;
  name: string;
  value: string;
  dataAutomation: string;
  iconSize?: number;
  classNames?: string;
} & Partial<TextareaHTMLAttributes<HTMLTextAreaElement>>;
