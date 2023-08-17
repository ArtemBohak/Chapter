import { InputHTMLAttributes } from "react";

export type TextFieldProps = {
  id: string;
  className?: string;
  label?: string;
  name: string;
  dataAutomation: string;
} & Partial<InputHTMLAttributes<HTMLInputElement>>;
