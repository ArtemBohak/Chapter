import { FC, MouseEvent } from "react";

import { CommentProps } from "./Comment.type";
import { getDate } from "@/src/utils";
import styles from "./Comment.module.scss";

import { TextTagging } from "@/src/components";
import { LikesButton, CommentsButton } from "../../../../..";

import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Comment: FC<CommentProps> = ({
  author: { avatar, firstName, lastName, relativeDate, nickName },
  commentsCount,
  likeCount,
  usersId,
  postId,
  caption,
  hideCommentBtn = false,
}) => {
  const avatarUrl = avatar ? avatar : defaultAvatar;

  const onHandleTagClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget.value);
  };

  return (
    <div className={styles["comment"]}>
      <div className={styles["comment__image"]}>
        <img src={avatarUrl} alt="user avatar" width={44} height={44} />
      </div>
      <div className={styles["comment__content"]}>
        <div className={styles["comment__data"]}>
          <div className={styles["comment__user"]}>
            <h5>
              {firstName} {lastName}
            </h5>
            <p>{nickName}</p>
          </div>
          <p>{getDate(relativeDate)}</p>
        </div>
        <div className={styles["comment__text"]}>
          {
            <TextTagging
              text={caption || ""}
              onClick={onHandleTagClick}
              className={styles["comment__text-button"]}
            />
          }
        </div>

        <div className={styles["comment__buttons"]}>
          <LikesButton
            usersId={usersId}
            likeCount={likeCount}
            postId={postId}
          />
          {!hideCommentBtn ? (
            <CommentsButton
              textValue={commentsCount > 1 ? "replies" : "reply"}
              postId={postId}
              commentsCount={commentsCount}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Comment;
