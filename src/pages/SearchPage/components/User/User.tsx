import { FC, useState } from "react";
import { Link } from "react-router-dom";

import { UserProps } from "./User.type";
import styles from "./User.module.scss";

import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { FollowButton } from "@/src/components";

const User: FC<UserProps> = ({ id, nickName, isSubscribed, avatarUrl }) => {
  const [showFullNickName, setShowFullNickName] = useState(false);

  return (
    <>
      <Link
        to={`/${id}`}
        onMouseOver={() => setShowFullNickName(true)}
        onMouseOut={() => setShowFullNickName(false)}
        onTouchStart={() => setShowFullNickName(true)}
        onTouchEnd={() => setShowFullNickName(false)}
      >
        <img src={avatarUrl || defaultAvatar} width={52} height={52} />
        <span className={styles["nickname"]}>
          {nickName.length > 15
            ? showFullNickName
              ? nickName
              : nickName.slice(0, 15) + "..."
            : nickName}
        </span>
      </Link>
      <FollowButton
        id={id}
        classNames={styles["button"]}
        isSubscribeToAuthor={isSubscribed}
      />
    </>
  );
};

export default User;
