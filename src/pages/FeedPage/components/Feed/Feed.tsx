import { FC, useState } from "react";

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
import { likeApi } from "@/src/utils";
import { EndpointsEnum } from "@/src/axios";

const Feed: FC<FeedProps> = ({ nodeRef, loaderRef, pageValue, ...props }) => {
  const [commentsIsHide, setCommentsIsHide] = useState(true);

  return (
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
            <LikesButton
              {...props}
              id={props.postId}
              likeApi={likeApi(EndpointsEnum.POST_LIKE)}
              hiddenText
            />
            <CommentsButton
              {...props}
              setCommentsIsHide={setCommentsIsHide}
              id={props.postId}
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
        <PostComments
          {...props}
          commentsIsHide={commentsIsHide}
          setCommentsIsHide={setCommentsIsHide}
        />
      </div>
      {loaderRef ? (
        <input className="hidden" ref={loaderRef} defaultValue={pageValue} />
      ) : null}
    </div>
  );
};

export default Feed;
