import { FC } from "react";

import { UserAvatarProps } from "./UserAvatar.type";
import styles from "./UserAvatar.module.scss";

import default_avatar from "@/src/assets/SVG/default-user-avatar.svg";

const UserAvatar: FC<UserAvatarProps> = ({ avatar }) => {
  const avatarUrl = avatar ? avatar : default_avatar;
  return (
    <div className={styles["avatar"]}>
      <img src={avatarUrl} alt="avatar" width={32} height={32} />
    </div>
  );
};

export default UserAvatar;
