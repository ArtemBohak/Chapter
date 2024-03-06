import { FC, useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "@/src/redux";
import { useRefIntersection } from "@/src/hooks";
import { intersectionHandlerCB } from "@/src/utils";
import { FeedProps } from "./Feed.type";
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

const Feed: FC<FeedProps> = ({ nodeRef, pageValue, ...props }) => {
  const [commentsIsHide, setCommentsIsHide] = useState(true);
  const userId = useAppSelector((state) => state.userSlice.user.id);

  const { setFeeds, setPage } = useFeedContext();

  useRefIntersection(nodeRef, intersectionHandlerCB(setPage), {
    thresholds: [1],
  });

  const navId = props.author.id !== userId ? `/${props.author.id}` : "#";
  return (
    <div className={styles["feed"]}>
      <div
        className="hide-element"
        ref={nodeRef}
        data-value={nodeRef && pageValue ? pageValue : ""}
      />
      <div
        className={`${styles["feed__wrapper"]} ${styles["feed__wrapper--top"]}`}
      >
        <div className={styles["feed__user"]}>
          <Link className={styles["feed__user-content"]} to={navId}>
            <Avatar avatarUrl={props.author.avatar} />
            <UserNickName nickName={props.author.nickName} />
          </Link>
          <FollowButton {...props} id={props.author.id} />
        </div>
        <div className={styles["feed__image"]}>
          <PostImage {...props} />
        </div>
        <div className={styles["feed__activity"]}>
          <div className={styles["feed__activity-icons"]}>
            <LikesButton
              {...props}
              id={props.postId}
              url={EndpointsEnum.POST_LIKE}
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
          <div className={styles["feed__activity-text"]}>
            <Link to={navId}>
              <PostFullName
                firstName={props.author.firstName}
                lastName={props.author.lastName}
              />
            </Link>
            <PostDate {...props} />
          </div>
        </div>
        <PostTitle {...props} />
        <PostText {...props} isLimit />
      </div>
      <div
        className={`${styles["feed__wrapper"]} ${styles["feed__wrapper--bottom"]}`}
      >
        <PostComments
          {...props}
          commentsIsHide={commentsIsHide}
          setCommentsIsHide={setCommentsIsHide}
          setFeeds={setFeeds}
        />
      </div>
    </div>
  );
};

export default Feed;
