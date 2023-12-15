import { ReactNode } from "react";

export interface IPostButtonProps {
  children: ReactNode;
  onHandleClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
  variant?: "outlined" | "contained";
  type?: "submit" | "button";
  dataAutomation?: string;
}
