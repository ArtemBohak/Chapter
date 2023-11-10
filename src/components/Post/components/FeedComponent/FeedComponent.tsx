import { FC } from "react";

import { FeedComponentProps } from "./FeedComponent.type";
import styles from "./FeedComponent.module.scss";

import {
  UserAvatar,
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
} from "../components";

const FeedComponent: FC<FeedComponentProps> = ({ nodeRef, ...props }) => (
  <div className={styles["item-feed"]} ref={nodeRef}>
    <div
      className={`${styles["item-feed__wrapper"]} ${styles["item-feed__wrapper--top"]}`}
    >
      <div className={styles["item-feed__user"]}>
        <div className={styles["item-feed__user-content"]}>
          <UserAvatar {...props} />
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
            textValue={props.totalComments > 1 ? "comments" : "comment"}
          />
        </div>
        <div className={styles["item-feed__activity-text"]}>
          <PostFullName {...props} />
          <PostDate {...props} />
        </div>
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

export default FeedComponent;
