import { FC } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";

import { EndpointsEnum, api } from "@/src/axios";
import { ToastProps } from "./Toast.type";
import { genLink } from "./utils";
import styles from "./Toast.module.scss";

import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { useErrorBoundary } from "@/src/hooks";

const Toast: FC<ToastProps> = ({
  data: {
    message,
    user: { id: userId, firstName, lastName, nickName, avatarUrl },
  },
  id,
  nodeRef,
  classNames,
  messageClassNames,
  setNotifications,
}) => {
  const setErrorBoundary = useErrorBoundary();

  const onHandleClick = async () => {
    try {
      setNotifications((state) => state.filter((el) => el.id !== id));
      await api.delete(EndpointsEnum.NOTA + "/" + id);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    }
  };
  return (
    <div className={`${styles["toast"]} ${classNames}`} ref={nodeRef}>
      <Link to={genLink(message, userId)} className={styles["toast__user"]}>
        <img
          src={avatarUrl ? avatarUrl : defaultUserAvatar}
          width={40}
          height={40}
        />
        <span className={styles["user__text"]}>
          <span>
            {firstName} {lastName}
          </span>
          <span className={styles["user__nickname"]}>{nickName}</span>
        </span>
      </Link>
      <button
        className={`${styles["toast__message"]} ${messageClassNames}`}
        onClick={onHandleClick}
      >
        {message}
      </button>
    </div>
  );
};

export default Toast;
