import { FC } from "react";

import { useAppSelector } from "@/src/redux/hooks";
import { AvatarProps } from "./Avatar.type";
import styles from "./Avatar.module.scss";

import defaultUserAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Avatar: FC<AvatarProps> = ({ avatarUrl }) => {
  const { user } = useAppSelector((state) => state.userSlice);

  return (
    <div className={styles["avatar-container"]}>
      <img
        src={avatarUrl || defaultUserAvatar}
        alt="avatar"
        width="120"
        className={`${styles["avatar-container__image"]} ${styles["avatar-container__image--mob"]}`}
      />
      <img
        src={avatarUrl || defaultUserAvatar}
        alt="avatar"
        width="216"
        className={`${styles["avatar-container__image"]} ${styles["avatar-container__image--desc"]}`}
      />
      <p className={styles["avatar-container__email"]}>
        {user.email || "test.test@test.com"}
      </p>
    </div>
  );
};

export default Avatar;
