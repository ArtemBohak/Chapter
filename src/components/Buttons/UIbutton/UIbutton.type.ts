import { ButtonHTMLAttributes } from "react";
import { IconEnum } from "../../Icon";

export type ButtonColorType = "primary" | "secondary";
export type ButtonVariantType = "outlined" | "contained" | "text";
export type ButtonSizeType = "small" | "medium" | "large";
export type AlignIconType = "left" | "right";

export type UIButtonProps = {
  className?: string;
  color?: ButtonColorType;
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  dataAutomation: "submitButton" | "resetButton" | "navigationButton" | string;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: IconEnum;
  isCustomIcon?: boolean;
  alignIcon?: AlignIconType;
  href?: string;
} & Partial<ButtonHTMLAttributes<HTMLButtonElement>>;
