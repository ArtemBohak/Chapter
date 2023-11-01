import { FC, useState } from "react";
import cn from "classnames";

import { useFindUserId } from "@/src/hooks";
import { useFeedContext } from "@/src/pages/FeedPage/context";
import { LikesButtonProps } from "./LikesButton.type";
import styles from "../../FeedActivity.module.scss";

import { Icon, IconEnum } from "@/src/components";

const LikesButton: FC<LikesButtonProps> = ({ likesList, totalLikes, id }) => {
  const { fetchData } = useFeedContext();
  const [liked] = useFindUserId(likesList);

  const [isLiked, setIsLiked] = useState(liked);
  const [likedValue, setLikedValue] = useState(totalLikes);

  const onHandleClick = () => {
    setIsLiked(!isLiked);
    fetchData(id);

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
