import { FC } from "react";
import cn from "classnames";

import { CommentsButtonProps } from "./CommentsButton.type";
import styles from "../IconButtons.module.scss";

import { Icon, IconEnum } from "@/src/components";

const CommentsButton: FC<CommentsButtonProps> = ({
  totalComments = 0,
  textValue = "comment",
  id,
  hiddenText = false,
  fetchData,
}) => {
  const onHandleClick = () => {
    fetchData && fetchData(id);
  };

  const btnTextStyle = cn(styles["icon-button__text"], {
    [styles["icon-button__text-hidden"]]: hiddenText,
  });

  return (
    <button
      onClick={onHandleClick}
      data-automation="clickButton"
      className={styles["icon-button"]}
    >
      <Icon
        icon={IconEnum.Comments}
        removeInlineStyle
        className={styles["icon-button__icon"]}
      />
      <span>
        {totalComments ? totalComments : ""}{" "}
        <span className={btnTextStyle}>{textValue}</span>
      </span>
    </button>
  );
};

export default CommentsButton;
