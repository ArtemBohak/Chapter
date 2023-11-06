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

const Post: FC<PostProps> = ({ pageVariant, nodeRef, ...props }) => {
  if (pageVariant === "feed")
    return (
      <div className={styles["post-item"]}>
        <div
          className={`${styles["post-item__wrapper"]} ${styles["post-item__wrapper--top"]}`}
        >
          <div className={styles["post-item__user"]}>
            <User {...props} />
            <FollowButton {...props} />
          </div>
          <div className={styles["post-item__image"]}>
            <PostImage {...props} pageVariant={pageVariant} />
            <PostActivity {...props} />
          </div>
          <PostText {...props} />
        </div>
        <div
          className={`${styles["post-item__wrapper"]} ${styles["post-item__wrapper--bottom"]}`}
        >
          <div>
            <PostComments {...props} />
          </div>
        </div>
      </div>
    );

  if (pageVariant === "post")
    return <div className={styles["post-item"]} ref={nodeRef}></div>;
};

export default Post;
