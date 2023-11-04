import { FC } from "react";
import cn from "classnames";

import { IFeedButtonProps } from "./FeedButton.type";
import styles from "./FeedButton.module.scss";

const FeedButton: FC<IFeedButtonProps> = ({
  children,
  isDisabled = false,
  isLoading = false,
  onHandleClick,
  className,
  variant = "contained",
  type = "button",
  dataAutomation = "clickButton",
}) => {
  const classnames = cn(
    styles["feed-button"],
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
    >
      {children}
    </button>
  );
};

export default FeedButton;
