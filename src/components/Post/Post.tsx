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
  PostTitle,
} from "./components";

const Post: FC<PostProps> = ({ pageVariant, nodeRef, ...props }) => {
  if (pageVariant === "feed")
    return (
      <div className={styles["item-feed"]} ref={nodeRef}>
        <div
          className={`${styles["item-feed__wrapper"]} ${styles["item-feed__wrapper--top"]}`}
        >
          <div className={styles["item-feed__user"]}>
            <User {...props} pageVariant={pageVariant} />
            <FollowButton {...props} />
          </div>
          <div className={styles["item-feed__image"]}>
            <PostImage {...props} pageVariant={pageVariant} />
            <PostActivity {...props} />
          </div>
          <PostTitle {...props} />
          <PostText {...props} />
        </div>
        <div
          className={`${styles["item-feed__wrapper"]} ${styles["item-feed__wrapper--bottom"]}`}
        >
          <PostComments {...props} />
        </div>
      </div>
    );

  return (
    <div className={styles["item-post"]} ref={nodeRef}>
      <div className={styles["item-post__image"]}>
        <PostImage {...props} pageVariant={pageVariant} />
      </div>
      <div className={styles["item-post__content"]}>
        <div className={styles["item-post__content-wrapper"]}>
          <PostTitle {...props} />
          <div className={styles["item-post__user"]}>
            <User {...props} pageVariant={pageVariant} />
            <FollowButton {...props} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
