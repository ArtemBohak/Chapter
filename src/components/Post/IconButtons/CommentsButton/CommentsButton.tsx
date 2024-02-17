import { FC } from "react";
import cn from "classnames";

import { CommentsButtonProps } from "./CommentsButton.type";
import styles from "../IconButtons.module.scss";

import { Icon, IconEnum } from "@/src/components";

const CommentsButton: FC<CommentsButtonProps> = ({
  commentsCount,
  textValue,
  id,
  hiddenText = false,
  nickName,
  setCommentsIsHide,
  setNickName,
  setId,
}) => {
  const onHandleClick = () => {
    setCommentsIsHide && setCommentsIsHide(false);
    setId && setId(id);
    setNickName && setNickName(nickName || "");
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
        {commentsCount ? commentsCount : ""}{" "}
        <span className={btnTextStyle}>{textValue}</span>
      </span>
    </button>
  );
};

export default CommentsButton;
