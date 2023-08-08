import { FC } from "react";

import styles from "./UIbutton.module.scss";

type Props = {
  className?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  title?: string;
  variant?: "orange-outlined" | "orange-contained" | "black-outlined";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  dataAutomation: "sign-in-button";
};

const UIbutton: FC<Props> = ({
  className,
  isDisabled,
  title,
  type,
  variant,
  dataAutomation,
  ...props
}) => {
  const variantClassName: string =
    (variant && styles[variant]) || styles["orange-contained"];

  return (
    <button
      data-automation={dataAutomation}
      disabled={!!isDisabled}
      type={type && "button"}
      className={`${styles["btn"]} ${variantClassName} ${className}`}
      {...props}
    >
      {title || "button"}
    </button>
  );
};

export default UIbutton;
