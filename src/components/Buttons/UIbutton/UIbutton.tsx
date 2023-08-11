import { ButtonHTMLAttributes, FC } from "react";
import cn from "classnames";

import styles from "./UIbutton.module.scss";

type Props = {
  className?: string;
  variant?: "orange-outlined" | "orange-contained" | "black-outlined";
  dataAutomation: "submitButton" | "resetButton" | "navigationButton" | string;
  isLoading?: boolean;
} & Partial<ButtonHTMLAttributes<HTMLButtonElement>>;

const UIbutton: FC<Props> = ({
  isLoading = false,
  className,
  children,
  variant,
  dataAutomation,
  type = "button",
  ...props
}) => {
  const variantClassName: string =
    (variant && styles[variant]) || styles["orange-contained"];

  return (
    <button
      type={type}
      data-automation={dataAutomation}
      className={cn(
        styles["btn"],
        variantClassName,
        {
          [styles["btn_loading"]]: isLoading,
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default UIbutton;
