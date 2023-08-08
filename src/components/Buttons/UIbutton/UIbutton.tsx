import { FC } from "react";

import styles from "./UIbutton.module.css";

type Props = {
  className?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
  title?: string;
  variant?: "orange-outlined" | "orange-contained" | "black-outlined";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

const UIbutton: FC<Props> = ({
  className,
  isDisabled,
  title,
  type,
  variant,
  ...props
}) => {
  const variantClassName: string =
    (variant && styles[variant]) || styles["orange-contained"];

  return (
    <button
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
