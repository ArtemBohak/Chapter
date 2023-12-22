import { InputHTMLAttributes } from "react";

export type SelectFieldProps = {
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
  options: {
    value: string,
    text: string,
  }[];

  customErrorMessage?: string | null;
} & Partial<InputHTMLAttributes<HTMLSelectElement>>;