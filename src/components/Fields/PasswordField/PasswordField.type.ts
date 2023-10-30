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
  strengthMessage?: string;
  customErrorMessage?: string | null;
  additionalLabel?: string;
} & Partial<Omit<InputHTMLAttributes<HTMLInputElement>, "type">>;
