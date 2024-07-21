import { InputHTMLAttributes } from "react";

export type TextFieldProps = {
  id: string;
  className?: string;
  label?: string;
  name: string;
  showSuccessIcon?: boolean;
  dataAutomation: string;
  additionalLabel?: string;
  helperLink?: {
    text: string;
    href: string;
  };

  customErrorMessage?: string | null;
} & Partial<InputHTMLAttributes<HTMLInputElement>>;
