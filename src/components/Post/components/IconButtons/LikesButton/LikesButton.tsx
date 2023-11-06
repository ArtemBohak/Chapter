import { FC, useState } from "react";
import cn from "classnames";

import { useFindUserId } from "@/src/hooks";
import { LikesButtonProps } from "./LikesButton.type";
import { Like } from "./components/LikesModal/LikesModal.type";
import styles from "../IconButtons.module.scss";
import likesButtonStyles from "./LikesButton.module.scss";

import { Icon, IconEnum } from "@/src/components";
import { LikesModal } from "./components";

const dataLikes = [
  {
    avatar: null,
    firstName: "Kristin",
    lastName: "Wood",
    likesList: [1, 12, 168],
    id: 0,
  },
  {
    avatar: null,
    firstName: "Kristin",
    lastName: "Wood",
    likesList: [1, 12, 168],
    id: 1,
  },
  {
    avatar: null,
    firstName: "Kristin",
    lastName: "Wood",
    likesList: [],
    id: 2,
  },
  {
    avatar: null,
    firstName: "Kristin",
    lastName: "Wood",
    likesList: [1, 12],
    id: 3,
  },
  {
    avatar: null,
    firstName: "Kristin",
    lastName: "Wood",
    likesList: [1, 12, 168],
    id: 4,
  },
  {
    avatar: null,
    firstName: "Kristin",
    lastName: "Wood",
    likesList: [1, 12, 168],
    id: 5,
  },
  {
    avatar: null,
    firstName: "Kristin",
    lastName: "Wood",
    likesList: [1, 12],
    id: 6,
  },
  {
    avatar: null,
    firstName: "Kristin",
    lastName: "Wood",
    likesList: [1, 12],
    id: 7,
  },
  {
    avatar: null,
    firstName: "Kristin",
    lastName: "Wood",
    likesList: [1, 12],
    id: 8,
  },
  {
    avatar: null,
    firstName: "Kristin",
    lastName: "Wood",
    likesList: [1, 12, 168],
    id: 9,
  },
  {
    avatar: null,
    firstName: "Kristin",
    lastName: "Wood",
    likesList: [1, 12],
    id: 10,
  },
];

const LikesButton: FC<LikesButtonProps> = ({
  likesList,
  totalLikes = 0,
  id,
  hiddenText = false,
  fetchData,
}) => {
  const [liked] = useFindUserId(likesList);

  const [isLiked, setIsLiked] = useState(liked);
  const [likedValue, setLikedValue] = useState(totalLikes);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [likes, setLikes] = useState<Array<Like>>([]);

  const onHandleLikesClick = () => {
    setIsLiked(!isLiked);
    fetchData && fetchData(id);

    isLiked && setLikedValue(likedValue - 1);
    !isLiked && setLikedValue(likedValue + 1);
  };
  const onHandleModalOpenClick = () => {
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
        <span className={btnTextStyle}>like{totalLikes > 1 ? "s" : ""}</span>
      </button>
      <LikesModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        totalLikes={likedValue}
        likesData={likes}
        fetchData={fetchData}
      />
    </div>
  );
};

export default LikesButton;