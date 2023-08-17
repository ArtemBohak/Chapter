import { FC } from "react";
import cn from "classnames";

import { type UIButtonProps } from "@/src/components/Buttons";
import styles from "./UIbutton.module.scss";

const UIbutton: FC<UIButtonProps> = ({
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
