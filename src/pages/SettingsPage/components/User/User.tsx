import { FC } from "react";

import { UserProps } from "./User.type";
import styles from "./User.module.scss";

const User: FC<UserProps> = ({ avatarUrl, email }) => {
  return (
    <div className={styles["user"]}>
      <img
        src={avatarUrl}
        alt="avatar"
        width="120"
        height="120"
        className={`${styles["user__image"]} ${styles["user__image--mob"]}`}
      />
      <img
        src={avatarUrl}
        alt="avatar"
        width="210"
        height="210"
        className={`${styles["user__image"]} ${styles["user__image--tab"]}`}
      />
      <img
        src={avatarUrl}
        alt="avatar"
        width="216"
        height="216"
        className={`${styles["user__image"]} ${styles["user__image--desc"]}`}
      />
      <p className={styles["user__email"]}>{email || ""}</p>
    </div>
  );
};

export default User;
