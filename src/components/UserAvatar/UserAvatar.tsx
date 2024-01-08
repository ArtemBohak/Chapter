import { FC } from "react";
import cn from "classnames";

import { ElementsId } from "@/src/types";
import { UserAvatarProps } from "./UserAvatar.type";
import styles from "./UserAvatar.module.scss";

const UserAvatar: FC<UserAvatarProps> = ({
  src,
  alt,
  size = "small",
  className,
  onClick,
}) => {
  const onHandleClick = () => {
    onClick && onClick();
  };

  const sizeCn = cn({
    [styles["user-avatar--small"]]: size === "small",
    [styles["user-avatar--large"]]: size === "large",
  });
  return (
    <div className={cn(styles["user-avatar"], sizeCn, className)}>
      <img
        src={src}
        alt={alt}
        className={styles["user-avatar__image"]}
        onClick={onHandleClick}
        id={ElementsId.AVATAR}
      />
    </div>
  );
};

export default UserAvatar;
