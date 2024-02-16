import { FC, useState } from "react";

import { FeedProps } from "./Feed.type";
import { likeApi } from "@/src/utils";
import { EndpointsEnum } from "@/src/axios";
import { useFeedContext } from "../../context";
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

const Feed: FC<FeedProps> = ({ nodeRef, loaderRef, pageValue, ...props }) => {
  const [commentsIsHide, setCommentsIsHide] = useState(true);
  const { setFeeds } = useFeedContext();

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
          <FollowButton {...props} id={props.author.id} />
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
          setFeeds={setFeeds}
        />
      </div>
      {loaderRef ? (
        <input className="invisible" ref={loaderRef} defaultValue={pageValue} />
      ) : null}
    </div>
  );
};

export default Feed;
