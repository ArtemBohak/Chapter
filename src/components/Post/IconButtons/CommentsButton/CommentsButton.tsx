import { FC } from "react";
import cn from "classnames";

import { CommentsButtonProps } from "./CommentsButton.type";
import styles from "../IconButtons.module.scss";

import { Icon, IconEnum } from "@/src/components";
import { useAppSelector } from "@/src/redux";

const CommentsButton: FC<CommentsButtonProps> = ({
  commentsCount,
  textValue,
  id,
  hiddenText = false,
  nickName,
  authorId,
  setCommentsIsHide,
  setNickName,
  setReplyToUserId,
  setId,
}) => {
  const userId = useAppSelector((state) => state.userSlice.user.id);
  const onHandleClick = () => {
    setCommentsIsHide && setCommentsIsHide(false);
    setId && setId(id);
    if (authorId !== userId) {
      setNickName && setNickName(nickName || "");
      setReplyToUserId && setReplyToUserId(authorId || "");
    }
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
