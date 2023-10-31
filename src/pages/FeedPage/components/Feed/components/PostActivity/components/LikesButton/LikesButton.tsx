import { FC, useState } from "react";
import cn from "classnames";

import styles from "../../PostActivity.module.scss";

import { Icon, IconEnum } from "@/src/components";
import { ILikesButtonProps } from "./LikesButton.type";
import { useFindUserId } from "@/src/hooks";

const LikesButton: FC<ILikesButtonProps> = ({ likesList, likesValue }) => {
  const [liked] = useFindUserId(likesList);

  const [isLiked, setIsLiked] = useState(liked);
  const [likedValue, setLikedValue] = useState(likesValue);

  const onHandleClick = () => {
    setIsLiked(!isLiked);

    isLiked && setLikedValue(likedValue - 1);
    !isLiked && setLikedValue(likedValue + 1);
  };

  const iconStyles = cn(
    styles["icon-button__icon"],
    isLiked ? styles["liked"] : ""
  );

  return (
    <button
      onClick={onHandleClick}
      data-automation="clickButton"
      className={styles["icon-button"]}
    >
      <Icon
        icon={IconEnum.Likes}
        removeInlineStyle
        disableFill={isLiked}
        className={iconStyles}
      />

      <span>
        {likedValue} <span className={styles["icon-button__text"]}>likes</span>
      </span>
    </button>
  );
};

export default LikesButton;
