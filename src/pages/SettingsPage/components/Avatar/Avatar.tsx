import { FC } from "react";

import { useAppSelector } from "@/src/redux/hooks";
import styles from "./Avatar.module.scss";

import defaultUserAvatar from "@/src/assets/WEBP/default-user-avatar.svg";

const Avatar: FC = () => {
  const { user } = useAppSelector((state) => state.userSlice);

  return (
    <div className={styles["avatar"]}>
      <img
        src={user.avatarUrl || defaultUserAvatar}
        alt="avatar"
        width="120"
        className={`${styles["avatar__image"]} ${styles["avatar__image--mob"]}`}
      />
      <img
        src={user.avatarUrl || defaultUserAvatar}
        alt="avatar"
        width="215"
        className={`${styles["avatar__image"]} ${styles["avatar__image--desc"]}`}
      />
      <p className={styles["email"]}>{user.email || "test.test@test.com"}</p>
    </div>
  );
};

export default Avatar;
