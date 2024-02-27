import { FC } from "react";

import { ToastProps } from "./Toast.type";
import styles from "./Toast.module.scss";

import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Toast: FC<ToastProps> = ({
  setNotifications,
  id,
  firstName,
  lastName,
  avatarUrl,
  messageValue,
  classNames,
  messageClassNames,
}) => {
  const onHandleClick = () => {
    setNotifications((state) => state.filter((el) => el.id !== id));
  };
  return (
    <button
      key={id}
      className={`${styles["toast"]} ${classNames}`}
      onClick={onHandleClick}
    >
      <span className={styles["toast__user-data"]}>
        <img
          src={avatarUrl ? avatarUrl : defaultUserAvatar}
          width={40}
          height={40}
        />
        <span>
          {firstName} {lastName}
        </span>
      </span>
      <span className={`${styles["toast__message"]} ${messageClassNames}`}>
        {messageValue}
      </span>
    </button>
  );
};

export default Toast;
