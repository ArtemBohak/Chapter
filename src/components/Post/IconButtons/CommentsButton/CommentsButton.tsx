import { FC } from "react";
import cn from "classnames";

import { scrollTo } from "@/src/utils";
import { ElementsId } from "@/src/types";
import { CommentsButtonProps } from "./CommentsButton.type";
import styles from "../IconButtons.module.scss";

import { Icon, IconEnum } from "@/src/components";

const CommentsButton: FC<CommentsButtonProps> = ({
  commentsCount,
  textValue,
  id,
  hiddenText = false,
  nickName,
  authorId,
  postId,
  setCommentsIsHide,
  handleNickname,
}) => {
  const onHandleClick = () => {
    setCommentsIsHide && setCommentsIsHide(false);
    handleNickname && handleNickname(id, nickName, authorId);
    scrollTo(ElementsId.POST_FORM + postId);
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
