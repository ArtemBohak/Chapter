import { FC } from "react";

import { Link } from "react-router-dom";
import { CommentProps } from "./Comment.type";
import { EndpointsEnum } from "@/src/axios";

import { getDate } from "@/src/utils";
import { useAppSelector } from "@/src/redux";
import styles from "./Comment.module.scss";

import { TextTagging } from "@/src/components";
import { LikesButton, CommentsButton } from "../../../../..";

import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { useRefIntersection } from "@/src/hooks";

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
  loaderRef,
  pageValue,
  setNickName,
  setReplyToUserId,
  setId,
  setPage,
}) => {
  const userId = useAppSelector((state) => state.userSlice.user.id);

  const navId = authorId !== userId ? `/${authorId}` : "#";

  const avatarUrl = avatar ? avatar : defaultAvatar;

  useRefIntersection(loaderRef, setPage);

  return (
    <>
      <div className={styles["comment"]}>
        <Link to={navId} className={styles["comment__image"]}>
          <img src={avatarUrl} alt="user avatar" width={44} height={44} />
        </Link>
        <div className={styles["comment__content"]}>
          <div className={styles["comment__data"]}>
            <Link to={navId} className={styles["comment__user"]}>
              <h5>
                {firstName} {lastName}
              </h5>
              <p>{nickName}</p>
            </Link>
            <p>{getDate(createdAt)}</p>
          </div>
          <div className={styles["comment__text"]}>
            {
              <TextTagging
                replyTo={replyTo}
                text={text || ""}
                className={styles["comment__text-button"]}
                linkClassName={styles["comment__text-link"]}
              />
            }
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
                setId={setId}
                setNickName={setNickName}
                setReplyToUserId={setReplyToUserId}
              />
            ) : null}
          </div>
        </div>
      </div>
      {loaderRef && pageValue ? (
        <input className="invisible" ref={loaderRef} defaultValue={pageValue} />
      ) : null}
    </>
  );
};

export default Comment;
