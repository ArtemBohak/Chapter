import { FC, useEffect, useState } from "react";
import cn from "classnames";

import { useProfileContext } from "@/src/context";
import { useErrorBoundary, useFindUserId } from "@/src/hooks";
import { LikesButtonProps } from "./LikesButton.type";
import { User } from "./components/LikesModal/LikesModal.type";
import styles from "../Buttons.module.scss";

import { Icon, IconEnum } from "@/src/components";
import { LikesModal } from "./components";
import { IdList } from "@/src/types";
import { AxiosError, AxiosResponse } from "axios";
import { EndpointsEnum, api } from "@/src/axios";

const LikesButton: FC<LikesButtonProps> = ({
  userIds,
  id,
  hiddenText = false,
  withoutModal = false,
  url,
}) => {
  const setErrorBoundary = useErrorBoundary();
  const { setHeaderAddPostBtnIsDisabled } = useProfileContext();

  const [usersId, setUsersId] = useState<IdList>([...new Set(userIds)]);
  const [liked] = useFindUserId(usersId);
  const [isLiked, setIsLiked] = useState(liked);
  const [likeCount, setLikeCount] = useState(usersId.length);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usersLikedList, setUsersLikedList] = useState<Array<User>>([]);

  useEffect(() => {
    if (modalIsOpen) return setHeaderAddPostBtnIsDisabled(true);
    if (!modalIsOpen) return setHeaderAddPostBtnIsDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const onHandleLikeClick = async () => {
    try {
      setIsLiked(!isLiked);
      isLiked && setLikeCount((likeCount) => (likeCount -= 1));
      !isLiked && setLikeCount((likeCount) => (likeCount += 1));

      const res: AxiosResponse<Array<number>> = await api.post(url + id);

      const likes = [...new Set(res.data)];
      setUsersId(likes);
      setLikeCount(likes.length);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary && setErrorBoundary(e);
      }
    }
  };

  const onHandleModalOpenClick = async () => {
    try {
      setIsLoading(true);
      const { data }: AxiosResponse<Array<User>> = await api.get(
        EndpointsEnum.LIKED_USER_LIST + id
      );

      if (!data.length) return;
      setHeaderAddPostBtnIsDisabled(true);
      setUsersLikedList(data);

      setModalIsOpen(true);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    } finally {
      setIsLoading(false);
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
    <div className={styles["likes-button"]}>
      <button
        onClick={onHandleLikeClick}
        data-automation="clickButton"
        className={styles["icon-button"]}
        aria-label="Post like button"
      >
        <Icon
          icon={IconEnum.Likes}
          removeInlineStyle
          disableFill={isLiked}
          className={iconStyles}
        />
      </button>
      <button
        onClick={withoutModal ? onHandleLikeClick : onHandleModalOpenClick}
        data-automation="clickButton"
        className={styles["icon-button"]}
        aria-label="Post like button"
        disabled={isLoading}
      >
        {likeCount ? likeCount : ""}{" "}
        <span className={btnTextStyle}>like{likeCount > 1 ? "s" : ""}</span>
      </button>
      <LikesModal
        isOpen={modalIsOpen}
        setIsOpen={setModalIsOpen}
        likeCount={likeCount}
        likesData={usersLikedList}
      />
    </div>
  );
};

export default LikesButton;
