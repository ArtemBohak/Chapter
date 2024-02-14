import { FC } from "react";

import { LikeProps } from "./Like.type";
import styles from "./Like.module.scss";

import { FollowButton } from "@/src/components";
import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Like: FC<LikeProps> = ({
  lastName,
  avatar,
  firstName,
  id,
  isSubscribeToAuthor,
}) => {
  const avatarUrl = avatar ? avatar : defaultAvatar;

  return (
    <div className={styles["like-item"]}>
      <div className={styles["like-item__text-content"]}>
        <img src={avatarUrl} alt="user avatar" width={32} height={32} />
        <p>
          <span>{firstName}</span> <span>{lastName}</span>
        </p>
      </div>
      <FollowButton
        classNames={styles["like-item__button"]}
        id={id}
        isSubscribeToAuthor={isSubscribeToAuthor}
      />
    </div>
  );
};

export default Like;
