import { FC } from "react";

import { FeedProps } from "./Feed.type";
import styles from "./Feed.module.scss";

import {
  Avatar,
  FollowButton,
  PostImage,
  PostText,
  PostComments,
  PostTitle,
  UserNickName,
  LikesButton,
  CommentsButton,
  PostFullName,
  PostDate,
} from "@/src/components";

const Feed: FC<FeedProps> = ({ nodeRef, ...props }) => (
  <div className={styles["item-feed"]} ref={nodeRef}>
    <div
      className={`${styles["item-feed__wrapper"]} ${styles["item-feed__wrapper--top"]}`}
    >
      <div className={styles["item-feed__user"]}>
        <div className={styles["item-feed__user-content"]}>
          <Avatar {...props} />
          <UserNickName {...props} />
        </div>
        <FollowButton {...props} />
      </div>
      <div className={styles["item-feed__image"]}>
        <PostImage {...props} />
      </div>
      <div className={styles["item-feed__activity"]}>
        <div className={styles["item-feed__activity-icons"]}>
          <LikesButton {...props} hiddenText />
          <CommentsButton
            {...props}
            hiddenText
            textValue={props.commentsCount > 1 ? "comments" : "comment"}
          />
        </div>
        <div className={styles["item-feed__activity-text"]}>
          <PostFullName
            firstName={props.author.firstName}
            lastName={props.author.lastName}
          />
          <PostDate {...props} />
        </div>
      </div>
      <PostTitle {...props} />
      <PostText {...props} isLimit />
    </div>
    <div
      className={`${styles["item-feed__wrapper"]} ${styles["item-feed__wrapper--bottom"]}`}
    >
      <PostComments {...props} />
    </div>
  </div>
);

export default Feed;
