import { FC } from "react";

import { ICommentsButtonProps } from "./CommentsButton.type";
import styles from "../../PostActivity.module.scss";

import { Icon, IconEnum } from "@/src/components";

const CommentsButton: FC<ICommentsButtonProps> = ({ commentsValue }) => {
  const onHandleClick = () => {};

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
        {commentsValue}
        <span className={styles["icon-button__text"]}>comments</span>
      </span>
    </button>
  );
};

export default CommentsButton;
