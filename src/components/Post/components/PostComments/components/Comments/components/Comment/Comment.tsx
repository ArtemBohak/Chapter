import { FC } from "react";
import { Link } from "react-router-dom";

import { CommentProps } from "./Comment.type";
import { EndpointsEnum } from "@/src/axios";
import { getDate, intersectionHandlerCB } from "@/src/utils";
import { useRefIntersection } from "@/src/hooks";
import { useAppSelector } from "@/src/redux";
import styles from "./Comment.module.scss";

import { TextTagging } from "@/src/components";
import { LikesButton, CommentsButton, DeleteButton } from "../../../../..";

import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Comment: FC<CommentProps> = ({
  author: { avatar, firstName, lastName, nickName, id: authorId },
  commentsCount,
  commentCount,
  usersId,
  id,
  text,
  createdAt,
  hideCommentBtn = false,
  replyTo,
  postId,
  pageValue,
  pageLoaderRef,
  setAllComments,
  handleNickname,
  setPage,
  setPosts,
  setPost,
}) => {
  const userId = useAppSelector((state) => state.userSlice.user.id);

  const navId = authorId !== userId ? `/${authorId}` : "#";

  const avatarUrl = avatar ? avatar : defaultAvatar;

  useRefIntersection(intersectionHandlerCB(setPage), pageLoaderRef, {
    threshold: 0.1,
  });

  return (
    <div className={styles["comment"]}>
      <div
        className="hide-element"
        ref={pageLoaderRef}
        data-value={pageLoaderRef && pageValue ? pageValue : ""}
      />

      <Link
        to={navId}
        className={styles["comment__image"]}
        aria-label="User profile nav link"
      >
        <img src={avatarUrl} alt="user avatar" width={44} height={44} />
      </Link>
      <div className={styles["comment__content"]}>
        <div className={styles["comment__data"]}>
          <Link
            to={navId}
            className={styles["comment__user"]}
            aria-label="User profile nav link"
          >
            <h5>
              {firstName} {lastName}
            </h5>
            <p>{nickName}</p>
          </Link>
          <p>{getDate(createdAt)}</p>
        </div>
        <div className={styles["comment__text"]}>
          <TextTagging
            replyTo={replyTo}
            text={text || ""}
            className={styles["comment__text-button"]}
            linkClassName={styles["comment__text-link"]}
          />
        </div>
        <div className={styles["comment__buttons"]}>
          <LikesButton
            userIds={usersId}
            id={id}
            url={EndpointsEnum.COMMENT_LIKE}
            withoutModal
          />
          {!hideCommentBtn ? (
            <CommentsButton
              postId={postId}
              textValue={
                commentsCount > 1 || (commentCount && commentCount > 1)
                  ? "replies"
                  : "reply"
              }
              id={id}
              commentsCount={commentCount || commentsCount}
              nickName={nickName}
              authorId={authorId}
              handleNickname={handleNickname}
            />
          ) : null}
          <DeleteButton
            authorId={authorId}
            commentId={id}
            setPosts={setPosts}
            setAllComments={setAllComments}
            setPost={setPost}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
