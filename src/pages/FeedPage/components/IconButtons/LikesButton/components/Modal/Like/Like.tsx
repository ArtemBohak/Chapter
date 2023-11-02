import { FC, useState } from "react";
import { LikeProps } from "./Like.type";

import styles from "./Like.module.scss";
import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import FeedButton from "@/src/pages/FeedPage/components/FeedButton/FeedButton";
import { useFindUserId } from "@/src/hooks";
import { useFeedContext } from "@/src/pages/FeedPage/context";

const Like: FC<LikeProps> = ({
  avatar,
  firstName,
  lastName,
  id,
  likesList = [],
}) => {
  const [isFollow] = useFindUserId(likesList);
  const [following, setFollowing] = useState(isFollow);

  const { fetchData } = useFeedContext();

  const onHandleClick = () => {
    setFollowing(!following);
    fetchData(id);
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
      <FeedButton
        onHandleClick={onHandleClick}
        variant={btnVariant}
        className={styles["like-item__button"]}
      >
        {following ? "Unfollow" : "Follow"}
      </FeedButton>
    </div>
  );
};

export default Like;
