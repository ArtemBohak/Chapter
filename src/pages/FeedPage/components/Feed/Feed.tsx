import { FC } from "react";

import { FeedProps } from "./Feed.type";
import styles from "./Feed.module.scss";

import User from "./components/User/User";
import FollowButton from "./components/FollowButton/FollowButton";
import FeedImage from "./components/FeedImage/FeedImage";
import FeedActivity from "./components/FeedActivity/FeedActivity";
import FeedText from "./components/FeedText/FeedText";
import FeedComments from "./components/FeedComments/FeedComments";

const Feed: FC<FeedProps> = (props) => {
  return (
    <div className={styles["feed-item"]}>
      <div
        className={`${styles["feed-item__wrapper"]} ${styles["feed-item__wrapper--top"]}`}
      >
        <div className={styles["feed-item__top-container"]}>
          <User {...props} />
          <FollowButton {...props} />
        </div>
        <div className={styles["feed-item__image-wrapper"]}>
          <FeedImage {...props} />
          <FeedActivity {...props} />
        </div>
        <FeedText {...props} />
      </div>
      <div
        className={`${styles["feed-item__wrapper"]} ${styles["feed-item__wrapper--bottom"]}`}
      >
        <FeedComments {...props} />
      </div>
    </div>
  );
};

export default Feed;
