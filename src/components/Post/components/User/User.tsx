import { FC } from "react";

import { UserProps } from "./User.type";
import styles from "./User.module.scss";

import default_avatar from "@/src/assets/SVG/default-user-avatar.svg";
import { PostDate } from "..";

const User: FC<UserProps> = ({ avatar, nickName, date, pageVariant }) => {
  const avatarUrl = avatar ? avatar : default_avatar;
  return (
    <div className={styles["user"]}>
      <img src={avatarUrl} alt="avatar" width={32} height={32} />
      <div>
        <p className="subtitle1">{nickName}</p>
        {pageVariant === "post" ? <PostDate date={date} /> : null}
      </div>
    </div>
  );
};

export default User;
