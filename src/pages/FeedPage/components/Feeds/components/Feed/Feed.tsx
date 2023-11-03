import { FC } from "react";

import { FeedProps } from "./Feed.type";
import styles from "./Feed.module.scss";

import {
  FeedActivity,
  User,
  FollowButton,
  FeedImage,
  FeedText,
  FeedComments,
  // FeedForm,
} from "./components";

const Feed: FC<FeedProps> = (props) => {
  return (
    <div className={styles["feed-item"]}>
      <div
        className={`${styles["feed-item__wrapper"]} ${styles["feed-item__wrapper--top"]}`}
      >
        <div className={styles["feed-item__user"]}>
          <User {...props} />
          <FollowButton {...props} />
        </div>
        <div className={styles["feed-item__image"]}>
          <FeedImage {...props} />
          <FeedActivity {...props} />
        </div>
        <FeedText {...props} />
      </div>
      <div
        className={`${styles["feed-item__wrapper"]} ${styles["feed-item__wrapper--bottom"]}`}
      >
        <div className={styles["feed-item__comments"]}>
          <FeedComments {...props} />
        </div>
        <div className={styles["feed-item__form"]}>
          {/* <FeedForm {...props} /> */}
        </div>
      </div>
    </div>
  );
};

export default Feed;
