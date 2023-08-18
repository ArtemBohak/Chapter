import { InputHTMLAttributes } from "react";

export type PasswordFieldProps = {
  id: string;
  label?: string;
  name: string;
  dataAutomation: string;
  strength?: boolean;
  className?: string;
} & Partial<Omit<InputHTMLAttributes<HTMLInputElement>, "type">>;
