import { FC, useEffect, useMemo, useState } from "react";
import cn from "classnames";

import { useModalsContext } from "@/src/context";
import { useErrorBoundary, useFindUserId } from "@/src/hooks";
import { LikesButtonProps } from "./LikesButton.type";
import { Like } from "./components/LikesModal/LikesModal.type";
import styles from "../IconButtons.module.scss";
import likesButtonStyles from "./LikesButton.module.scss";

import { Icon, IconEnum } from "@/src/components";
import { LikesModal } from "./components";
import { IdList } from "@/src/types";
import { AxiosError } from "axios";
import { EndpointsEnum, api } from "@/src/axios";

const dataLikes: Array<Like> = [
  {
    nickName: "DD",
    avatar: null,
    firstName: "Kristin",
    lastName: "Wood",
    id: 0,
    relativeDate: Date.now(),
    isSubscribeToAuthor: false,
  },
];

const LikesButton: FC<LikesButtonProps> = ({
  userIds,
  id,
  hiddenText = false,
  withoutModal = false,
  likeApi,
}) => {
  const setErrorBoundary = useErrorBoundary();

  const { setHeaderAddPostBtnIsDisabled } = useModalsContext();

  const uniqueUsersId = useMemo(() => [...new Set(userIds)], [userIds]);
  const [users, setUsers] = useState<IdList>(uniqueUsersId);
  const [liked] = useFindUserId(users);
  const likeCount = users?.length;

  const [isLiked, setIsLiked] = useState(liked);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [likes, setLikes] = useState<Array<Like>>([]);

  useEffect(() => {
    if (modalIsOpen) return setHeaderAddPostBtnIsDisabled(true);
    if (!modalIsOpen) return setHeaderAddPostBtnIsDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const onHandleLikesClick = () => {
    likeApi(id, setUsers, setErrorBoundary);
  };

  const onHandleModalOpenClick = async () => {
    try {
      const res = await api.post(EndpointsEnum.LIKED_USER_LIST + id);
      console.log(res.data);
      setHeaderAddPostBtnIsDisabled(true);
      setLikes(dataLikes);

      setModalIsOpen(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    }
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
        onClick={withoutModal ? onHandleLikesClick : onHandleModalOpenClick}
        data-automation="clickButton"
        className={styles["icon-button"]}
      >
        {likeCount ? likeCount : ""}{" "}
        <span className={btnTextStyle}>like{likeCount > 1 ? "s" : ""}</span>
      </button>
      <LikesModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        likeCount={likeCount}
        likesData={likes}
      />
    </div>
  );
};

export default LikesButton;
