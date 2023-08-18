import { FC } from "react";
import cn from "classnames";

import { type UIButtonProps } from "@/src/components/Buttons/UIbutton/ui-button.type";
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
  console.log(props);
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
