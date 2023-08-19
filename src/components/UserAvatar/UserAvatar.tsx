import { FC } from "react";
import cn from "classnames";

import { UserAvatarProps } from "./UserAvatar.type";
import styles from "./UserAvatar.module.scss";

const UserAvatar: FC<UserAvatarProps> = ({ src, alt, size = "small" }) => {
  const sizeCn = cn({
    [styles["user-avatar--small"]]: size === "small",
    [styles["user-avatar--large"]]: size === "large",
  });
  return (
    <div className={cn(styles["user-avatar"], sizeCn)}>
      <img src={src} alt={alt} className={styles["user-avatar__image"]} />
    </div>
  );
};

export default UserAvatar;
