import { FC } from "react";

import { PostComponentProps } from "./PostComponent.type";
import styles from "./PostComponent.module.scss";

import {
  CommentsButton,
  FollowButton,
  LikesButton,
  PostComments,
  PostDate,
  PostImage,
  PostText,
  PostTitle,
  UserAvatar,
  UserNickName,
} from "../components";

const PostComponent: FC<PostComponentProps> = ({
  pageVariant,
  nodeRef,
  ...props
}) => (
  <div className={styles["item-post"]} ref={nodeRef}>
    <div className={styles["item-post__image"]}>
      <PostImage {...props} pageVariant={pageVariant} />
    </div>
    <div className={styles["item-post__content"]}>
      <div
        className={`${styles["item-post__content-wrapper"]} ${styles["item-post__content-wrapper-top"]}`}
      >
        <div className={styles["item-post__title"]}>
          <PostTitle {...props} />
        </div>
        <div className={styles["item-post__user"]}>
          <div className={styles["item-post__user-content"]}>
            <UserAvatar {...props} />
            <div className={styles["item-post__user-text"]}>
              <UserNickName {...props} classNames={styles["nickname"]} />
              <PostDate {...props} />
            </div>
          </div>
          <FollowButton
            {...props}
            classNames={styles["item-post__user-button"]}
          />
        </div>
        <div className={styles["item-post__text"]}>
          <PostText {...props} />
        </div>
        <div className={styles["item-post__icons-wrapper"]}>
          <LikesButton {...props} hiddenText />
          <CommentsButton
            {...props}
            hiddenText
            textValue={props.totalComments > 1 ? "comments" : "comment"}
          />
        </div>
      </div>
      <div
        className={`${styles["item-post__content-wrapper"]} ${styles["item-post__content-wrapper-bottom"]}`}
      >
        <PostComments {...props} />
      </div>
    </div>
  </div>
);

export default PostComponent;
