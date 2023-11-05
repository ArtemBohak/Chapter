import { FC } from "react";

import { PostProps } from "./Post.type";
import styles from "./Post.module.scss";

import {
  PostActivity,
  User,
  FollowButton,
  PostImage,
  PostText,
  PostComments,
} from "./components";

const Post: FC<PostProps> = ({ pageVariant, ...props }) => {
  if (pageVariant === "feed")
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
            <PostImage {...props} />
            <PostActivity {...props} />
          </div>
          <PostText {...props} />
        </div>
        <div
          className={`${styles["feed-item__wrapper"]} ${styles["feed-item__wrapper--bottom"]}`}
        >
          <div>
            <PostComments {...props} />
          </div>
        </div>
      </div>
    );
};

export default Post;
