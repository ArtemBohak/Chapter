import { FC } from "react";

import { PostComponentProps } from "./PostComponent.type";
import styles from "./PostComponent.module.scss";

import {
  FollowButton,
  PostDate,
  PostImage,
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
      <div className={styles["item-post__content-wrapper"]}>
        <PostTitle {...props} />
        <div className={styles["item-post__user"]}>
          <div className={styles["item-post__user-content"]}>
            <UserAvatar {...props} />
            <div className={styles["item-post__user-text"]}>
              <UserNickName {...props} classNames={styles["nickname"]} />
              <PostDate {...props} />
            </div>
          </div>
          <FollowButton {...props} />
        </div>
      </div>
    </div>
  </div>
);

export default PostComponent;
