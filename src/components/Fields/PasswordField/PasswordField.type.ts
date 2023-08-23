import { InputHTMLAttributes } from "react";

export type PasswordFieldProps = {
  id: string;
  label?: string;
  name: string;
  dataAutomation: string;
  strength?: boolean;
  className?: string;
  helperLink?: {
    text: string;
    href: string;
  };
} & Partial<Omit<InputHTMLAttributes<HTMLInputElement>, "type">>;
