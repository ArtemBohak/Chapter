import { ButtonHTMLAttributes } from "react";

export type UIButtonProps = {
  className?: string;
  variant?: "orange-outlined" | "orange-contained" | "black-outlined";
  dataAutomation: "submitButton" | "resetButton" | "navigationButton" | string;
  isLoading?: boolean;
} & Partial<ButtonHTMLAttributes<HTMLButtonElement>>;
