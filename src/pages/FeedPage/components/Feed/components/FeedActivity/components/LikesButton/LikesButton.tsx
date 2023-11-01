import { FC, useState } from "react";
import cn from "classnames";

import { useFindUserId } from "@/src/hooks";
import { useFeedContext } from "@/src/pages/FeedPage/context";
import { LikesButtonProps } from "./LikesButton.type";
import styles from "../../FeedActivity.module.scss";
import likesButtonStyles from "./LikesButton.module.scss";

import { Icon, IconEnum, LikesModal } from "@/src/components";

const LikesButton: FC<LikesButtonProps> = ({ likesList, totalLikes, id }) => {
  const { fetchData } = useFeedContext();
  const [liked] = useFindUserId(likesList);

  const [isLiked, setIsLiked] = useState(liked);
  const [likedValue, setLikedValue] = useState(totalLikes);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const onHandleLikesClick = () => {
    setIsLiked(!isLiked);
    fetchData(id);

    isLiked && setLikedValue(likedValue - 1);
    !isLiked && setLikedValue(likedValue + 1);
  };
  const onHandleModal = () => {
    setModalIsOpen(true);
  };

  const iconStyles = cn(
    styles["icon-button__icon"],
    isLiked ? styles["liked"] : ""
  );

  return (
    <div className={likesButtonStyles["likes-button"]}>
      <button
        onClick={onHandleLikesClick}
        data-automation="clickButton"
        className={styles["icon-button"]}
      >
        <Icon
          icon={IconEnum.Likes}
          removeInlineStyle
          disableFill={isLiked}
          className={iconStyles}
        />
      </button>
      <button
        onClick={onHandleModal}
        data-automation="clickButton"
        className={styles["icon-button"]}
      >
        {likedValue} <span className={styles["icon-button__text"]}>likes</span>
      </button>
      <LikesModal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
    </div>
  );
};

export default LikesButton;
