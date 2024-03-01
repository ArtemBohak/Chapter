import { FC } from "react";
import { Link } from "react-router-dom";

import { AxiosError } from "axios";
// import { INotification } from "@/src/types";
// import { api } from "@/src/axios";
import { ToastProps } from "./Toast.type";
import { genLink } from "./utils";
import styles from "./Toast.module.scss";

import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { useErrorBoundary } from "@/src/hooks";

const Toast: FC<ToastProps> = ({
  setNotifications,
  user: { id, firstName, lastName, avatarUrl, nickName },
  message,
  nodeRef,
  classNames,
  messageClassNames,
  keyId,
}) => {
  const setErrorBoundary = useErrorBoundary();

  const onHandleClick = async () => {
    try {
      // const { data }: AxiosResponse<Array<INotification>> = await api.delete(
      //   ""
      // );
      // setNotifications(data);
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    }
    setNotifications((state) => state.filter((el) => el.keyId !== keyId));
  };
  return (
    <Link
      to={genLink(message, id)}
      className={`${styles["toast"]} ${classNames}`}
      onClick={onHandleClick}
      ref={nodeRef}
    >
      <span className={styles["toast__user"]}>
        <img
          src={avatarUrl ? avatarUrl : defaultUserAvatar}
          width={40}
          height={40}
        />
        <span className={styles["user__text"]}>
          <span>
            {firstName} {lastName}
          </span>
          <span>{nickName}</span>
        </span>
      </span>
      <span className={`${styles["toast__message"]} ${messageClassNames}`}>
        {message}
      </span>
    </Link>
  );
};

export default Toast;
