import { FC } from "react";

import { AvatarProps } from "./UserAvatar.type";
import styles from "./UserAvatar.module.scss";

import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const UserAvatar: FC<AvatarProps> = ({ avatarUrl, userEmail }) => {
  return (
    <div className={styles["avatar"]}>
      <img
        src={avatarUrl || defaultUserAvatar}
        alt="avatar"
        width="120"
        height="120"
        className={`${styles["avatar__image"]} ${styles["avatar__image--mob"]}`}
      />
      <img
        src={avatarUrl || defaultUserAvatar}
        alt="avatar"
        width="210"
        height="210"
        className={`${styles["avatar__image"]} ${styles["avatar__image--tab"]}`}
      />
      <img
        src={avatarUrl || defaultUserAvatar}
        alt="avatar"
        width="216"
        height="216"
        className={`${styles["avatar__image"]} ${styles["avatar__image--desc"]}`}
      />
      <p className={styles["avatar__email"]}>{userEmail || ""}</p>
    </div>
  );
};

export default UserAvatar;
