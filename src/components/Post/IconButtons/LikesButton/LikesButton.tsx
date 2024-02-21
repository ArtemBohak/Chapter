import { FC, useEffect, useMemo, useState } from "react";
import cn from "classnames";

import { useProfileContext } from "@/src/context";
import { useErrorBoundary, useFindUserId } from "@/src/hooks";
import { LikesButtonProps } from "./LikesButton.type";
import { User } from "./components/LikesModal/LikesModal.type";
import styles from "../IconButtons.module.scss";
import likesButtonStyles from "./LikesButton.module.scss";

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
  totalLikes,
  likeApi,
}) => {
  const setErrorBoundary = useErrorBoundary();

  const { setHeaderAddPostBtnIsDisabled } = useProfileContext();

  const uniqueUsersId = useMemo(() => [...new Set(userIds)], [userIds]);
  const [users, setUsers] = useState<IdList>(uniqueUsersId);
  const [liked] = useFindUserId(users);
  const likeCount = totalLikes || users?.length;

  const [isLiked, setIsLiked] = useState(liked);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [likes, setLikes] = useState<Array<User>>([]);

  useEffect(() => {
    if (modalIsOpen) return setHeaderAddPostBtnIsDisabled(true);
    if (!modalIsOpen) return setHeaderAddPostBtnIsDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);

  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const onHandleLikesClick = () => {
    likeApi && likeApi(id, setUsers, setErrorBoundary);
  };

  const onHandleModalOpenClick = async () => {
    try {
      const { data }: AxiosResponse<Array<User>> = await api.get(
        EndpointsEnum.LIKED_USER_LIST + id
      );

      if (!data.length) return;
      setHeaderAddPostBtnIsDisabled(true);
      setLikes(data);

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
