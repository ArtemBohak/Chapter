import { FC, useState } from "react";
import { LikeProps } from "./Like.type";

import { useFindUserId } from "@/src/hooks";
import styles from "./Like.module.scss";
import { PostButton } from "@/src/components/Post/components";
import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Like: FC<LikeProps> = ({
  author: { avatar, firstName, lastName, id },
  userIds,
  fetchData,
}) => {
  const [isFollow] = useFindUserId(userIds);
  const [following, setFollowing] = useState(isFollow);

  const onHandleClick = () => {
    setFollowing(!following);
    fetchData && fetchData(id);
  };

  const avatarUrl = avatar ? avatar : defaultAvatar;
  const btnVariant = following ? "outlined" : "contained";
  return (
    <div className={styles["like-item"]}>
      <div className={styles["like-item__text-content"]}>
        <img src={avatarUrl} alt="user avatar" width={32} height={32} />
        <p>
          <span>{firstName}</span> <span>{lastName}</span>
        </p>
      </div>
      <PostButton
        onHandleClick={onHandleClick}
        variant={btnVariant}
        className={styles["like-item__button"]}
      >
        {following ? "Unfollow" : "Follow"}
      </PostButton>
    </div>
  );
};

export default Like;
