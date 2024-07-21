import { FC } from "react";
import cn from "classnames";

import { IPostButtonProps } from "./PostButton.type";
import styles from "./PostButton.module.scss";

const PostButton: FC<IPostButtonProps> = ({
  children,
  isDisabled = false,
  isLoading = false,
  onHandleClick,
  className,
  variant = "contained",
  type = "button",
  dataAutomation = "clickButton",
  ...props
}) => {
  const classnames = cn(
    styles["post-button"],
    {
      [styles["loading"]]: isLoading,
      [styles["contained"]]: variant === "contained",
      [styles["outlined"]]: variant === "outlined",
    },
    className
  );
  const onClick = () => {
    onHandleClick && onHandleClick();
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={classnames}
      disabled={isLoading || isDisabled}
      data-automation={dataAutomation}
      {...props}
    >
      {children}
    </button>
  );
};

export default PostButton;
