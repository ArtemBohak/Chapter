import { InputHTMLAttributes } from "react";

export type TextFieldProps = {
  id: string;
  className?: string;
  label?: string;
  name: string;
  showSuccessIcon?: boolean;
  dataAutomation: string;
  helperLink?: {
    text: string;
    href: string;
  };
} & Partial<InputHTMLAttributes<HTMLInputElement>>;
