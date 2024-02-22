import { FC } from "react";
import { NotificationProps } from "./Notification.type";
import styles from "./Notification.module.scss";

import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Notification: FC<NotificationProps> = ({
  id,
  firstName,
  lastName,
  avatarUrl,
  messageValue,
  classNames,
  setNotifications,
}) => {
  const onHandleClick = () => {
    setNotifications((notifications) =>
      notifications.filter((el) => el.id !== id)
    );
  };
  return (
    <div
      onClick={onHandleClick}
      className={`${styles["notify"]} ${classNames}`}
    >
      <div className={styles["notify__user-data"]}>
        <img
          src={avatarUrl ? avatarUrl : defaultUserAvatar}
          width={40}
          height={40}
        />
        <p>
          {firstName} {lastName}
        </p>
      </div>
      <p className={styles["notify__message"]}>{messageValue}</p>
    </div>
  );
};

export default Notification;
