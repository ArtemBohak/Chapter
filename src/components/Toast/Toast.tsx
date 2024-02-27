import { FC } from "react";
import { Link } from "react-router-dom";

import { ToastProps } from "./Toast.type";
import { genLink } from "./utils";
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
  eventType,
  messageClassNames,
}) => {
  const onHandleClick = () => {
    setNotifications((state) => state.filter((el) => el.id !== id));
  };
  return (
    <Link
      to={genLink(eventType, id)}
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
    </Link>
  );
};

export default Toast;
