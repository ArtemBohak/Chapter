import { FC } from "react";
import { Link } from "react-router-dom";

import { LikeProps } from "./Like.type";
import styles from "./Like.module.scss";

import { FollowButton } from "@/src/components";
import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Like: FC<LikeProps> = ({
  lastName,
  avatarUrl,
  firstName,
  userId,
  isSubscribed,
}) => {
  const avatar = avatarUrl ? avatarUrl : defaultAvatar;

  return (
    <div className={styles["like-item"]}>
      <Link className={styles["like-item__text-content"]} to={`/${userId}`}>
        <img src={avatar} alt="user avatar" width={32} height={32} />
        <p>
          <span>{firstName}</span> <span>{lastName}</span>
        </p>
      </Link>
      <FollowButton
        classNames={styles["like-item__button"]}
        id={userId}
        isSubscribeToAuthor={isSubscribed}
      />
    </div>
  );
};

export default Like;
