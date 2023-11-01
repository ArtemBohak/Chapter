import { FC } from "react";

import { UserProps } from "./User.type";

import styles from "./User.module.scss";
import default_avatar from "@/src/assets/SVG/default-user-avatar.svg";

const User: FC<UserProps> = ({ avatar, nickName }) => {
  const avatarUrl = avatar ? avatar : default_avatar;
  return (
    <div className={styles["user"]}>
      <img src={avatarUrl} alt="avatar" width={32} height={32} />
      <p className="subtitle1">{nickName}</p>
    </div>
  );
};

export default User;
