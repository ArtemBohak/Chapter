import { FC, useState } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import cn from "classnames";

import { EndpointsEnum, api } from "@/src/axios";
import { ToastProps } from "./Toast.type";
import { genLink } from "./utils";
import { useErrorBoundary, useSwipe } from "@/src/hooks";

import styles from "./Toast.module.scss";

import { Icon, IconEnum } from "..";
import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Toast: FC<ToastProps> = ({
  data: {
    message,
    postId,
    user: { id: userId, firstName, lastName, nickName, avatarUrl },
  },
  id,
  nodeRef,
  classNames,
  messageClassNames,
  setNotifications,
  setIsLoading,
}) => {
  const [isShown, setIsShown] = useState(false);
  const setErrorBoundary = useErrorBoundary();

  useSwipe({
    leftSwipeCB: () => setIsShown(true),
    rightSwipeCB: () => setIsShown(false),
    enableSwipe: true,
    enableSwipeOnScreen: 1025,
    touchDistinction: 100,
  });

  const onHandleClick = async () => {
    setIsLoading && setIsLoading(true);
    try {
      await api.delete(EndpointsEnum.NOTA + "/" + id);
      setNotifications((state) => state.filter((el) => el.id !== id));
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    } finally {
      setIsLoading && setIsLoading(false);
    }
  };

  const deleteBtnClassNames = cn(styles["button"], {
    [styles["is-shown"]]: isShown,
  });
  return (
    <div
      className={`${styles["toast"]} ${classNames}`}
      ref={nodeRef}
      onMouseOver={() => setIsShown(true)}
      onMouseOut={() => setIsShown(false)}
    >
      <div className={styles["wrapper"]}>
        <Link
          to={`/${userId}`}
          className={styles["toast__user"]}
          aria-label="User profile nav link"
        >
          <img
            src={avatarUrl ? avatarUrl : defaultUserAvatar}
            width={40}
            height={40}
            alt="user avatar"
          />
          <span className={styles["user__text"]}>
            <span>
              {firstName} {lastName}
            </span>
            <span className={styles["user__nickname"]}>{nickName}</span>
          </span>
        </Link>
        <Link
          className={`${styles["toast__message"]} ${messageClassNames}`}
          to={genLink(userId, postId)}
          aria-label="User profile or post nav link"
        >
          {message}
        </Link>
      </div>
      <button
        data-automation="clickButton"
        className={deleteBtnClassNames}
        onClick={onHandleClick}
        aria-label="Delete notification button"
      >
        <Icon
          width={32}
          height={32}
          icon={IconEnum.TRASH}
          className={styles["button__icon"]}
        />
      </button>
    </div>
  );
};

export default Toast;
