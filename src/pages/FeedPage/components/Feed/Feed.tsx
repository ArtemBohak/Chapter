import { FC } from "react";

import { IFeedProps } from "./Feed.type";
import styles from "./Feed.module.scss";

import User from "./components/User/User";
import FollowButton from "./components/FollowButton/FollowButton";
import FeedImage from "./components/FeedImage/FeedImage";
import PostActivity from "./components/PostActivity/PostActivity";

const followers = [1, 2, 177];

const Feed: FC<IFeedProps> = ({
  avatar = null,
  nickName = "@Jgreen",
  followList = followers,
  likesList = followers,
  image,
  likesValue = 100,
  commentsValue = 100,
}) => {
  return (
    <div className={styles["feed-item"]}>
      <div className={styles["feed-item__top-container"]}>
        <User avatar={avatar} nickName={nickName} />
        <FollowButton followList={followList} />
      </div>
      <div className={styles["feed-item__image-thumb"]}>
        <FeedImage image={image} />
        <PostActivity
          likesList={likesList}
          likesValue={likesValue}
          commentsValue={commentsValue}
        />
      </div>
    </div>
  );
};

export default Feed;
