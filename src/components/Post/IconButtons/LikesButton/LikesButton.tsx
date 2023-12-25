import { FC, useEffect, useState } from "react";
import cn from "classnames";

import { useModalsContext } from "@/src/context";
import { useFindUserId } from "@/src/hooks";
import { LikesButtonProps } from "./LikesButton.type";
import { Like } from "./components/LikesModal/LikesModal.type";
import styles from "../IconButtons.module.scss";
import likesButtonStyles from "./LikesButton.module.scss";

import { Icon, IconEnum } from "@/src/components";
import { LikesModal } from "./components";

const dataLikes: Array<Like> = [
  {
    author: {
      nickName: "DD",
      avatar: null,
      firstName: "Kristin",
      lastName: "Wood",
      id: 0,
      relativeDate: Date.now(),
    },
    usersId: [1, 12, 318],
  },
];

const LikesButton: FC<LikesButtonProps> = ({
  usersId,
  likeCount,
  id,
  hiddenText = false,
  fetchData,
}) => {
  const { setHeaderAddPostBtnIsDisabled } = useModalsContext();

  const [liked] = useFindUserId(usersId);

  const [isLiked, setIsLiked] = useState(liked);
  const [likedValue, setLikedValue] = useState(likeCount);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [likes, setLikes] = useState<Array<Like>>([]);

  useEffect(() => {
    if (modalIsOpen) return setHeaderAddPostBtnIsDisabled(true);
    if (!modalIsOpen) return setHeaderAddPostBtnIsDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);

  const onHandleLikesClick = () => {
    setIsLiked(!isLiked);
    fetchData && fetchData(id);

    isLiked && setLikedValue(likedValue - 1);
    !isLiked && setLikedValue(likedValue + 1);
  };

  const onHandleModalOpenClick = () => {
    setHeaderAddPostBtnIsDisabled(true);
    setLikes(dataLikes);
    fetchData && fetchData(id);
    setModalIsOpen(true);
  };

  const iconStyles = cn(
    styles["icon-button__icon"],
    isLiked ? styles["liked"] : ""
  );

  const btnTextStyle = cn(styles["icon-button__text"], {
    [styles["icon-button__text-hidden"]]: hiddenText,
  });

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
        onClick={onHandleModalOpenClick}
        data-automation="clickButton"
        className={styles["icon-button"]}
      >
        {likedValue ? likedValue : ""}{" "}
        <span className={btnTextStyle}>like{likeCount > 1 ? "s" : ""}</span>
      </button>
      <LikesModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        likeCount={likedValue}
        likesData={likes}
        fetchData={fetchData}
      />
    </div>
  );
};

export default LikesButton;
