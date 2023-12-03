import { FC } from "react";

import { AvatarProps } from "./Avatar.type";
import styles from "./Avatar.module.scss";

import default_avatar from "@/src/assets/SVG/default-user-avatar.svg";

const Avatar: FC<AvatarProps> = ({ avatar }) => {
  const avatarUrl = avatar ? avatar : default_avatar;
  return (
    <div className={styles["avatar"]}>
      <img src={avatarUrl} alt="avatar" width={32} height={32} />
    </div>
  );
};

export default Avatar;
