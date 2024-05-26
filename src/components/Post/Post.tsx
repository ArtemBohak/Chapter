import { FC, useState } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "@/src/redux";
import { useRefIntersection } from "@/src/hooks";
import { intersectionHandlerCB } from "@/src/utils";
import { EndpointsEnum } from "@/src/axios";
import { PostProps } from "./Post.type";
import styles from "./Post.module.scss";

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

const Post: FC<PostProps> = ({
  nodeRef,
  pageLoaderRef,
  pageValue,
  classNames,
  ...props
}) => {
  const [commentsIsHide, setCommentsIsHide] = useState(true);
  const userId = useAppSelector((state) => state.userSlice.user.id);

  const navId = props.author.id !== userId ? `/${props.author.id}` : "#";

  useRefIntersection(intersectionHandlerCB(props.setPage), pageLoaderRef, {
    threshold: 1,
  });

  return (
    <div ref={nodeRef} className={`${styles["post"]} ${classNames}`}>
      <div
        ref={pageLoaderRef}
        data-value={pageLoaderRef && pageValue ? pageValue : ""}
        className="hide-element"
      />
      <div className={`${styles["wrapper"]} ${styles["wrapper__top"]}`}>
        <div className={styles["post__user"]}>
          <Link className={styles["user__content"]} to={navId}>
            <Avatar avatarUrl={props.author.avatar} />
            <UserNickName nickName={props.author.nickName} />
          </Link>
          <FollowButton {...props} id={props.author.id} />
        </div>
        <div className={styles["post__image"]}>
          <PostImage {...props} />
        </div>
        <div className={styles["post__activity"]}>
          <div className={styles["activity__icons"]}>
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
          <div className={styles["activity__text"]}>
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
        <PostText {...props} isLimited />
      </div>
      <div className={`${styles["wrapper"]} ${styles["wrapper__bottom"]}`}>
        <PostComments
          {...props}
          postAuthor={props.author.id}
          commentsIsHide={commentsIsHide}
          setCommentsIsHide={setCommentsIsHide}
        />
      </div>
    </div>
  );
};

export default Post;
