import { FC } from "react";

import { CommentProps } from "./Comment.type";

import { getDate, likeApi } from "@/src/utils";
import styles from "./Comment.module.scss";

import { TextTagging } from "@/src/components";
import { LikesButton, CommentsButton } from "../../../../..";

import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";
import { EndpointsEnum } from "@/src/axios";

const Comment: FC<CommentProps> = ({
  author: { avatar, firstName, lastName, nickName },
  commentsCount,
  commentCount,
  usersId,
  id,
  text,
  createdAt,
  hideCommentBtn = false,
  setNickName,
  setId,
}) => {
  const avatarUrl = avatar ? avatar : defaultAvatar;

  // const onHandleTagClick = (e: MouseEvent<HTMLButtonElement>) => {
  //   console.log(e.currentTarget.value);
  // };

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
          <p>{getDate(createdAt)}</p>
        </div>
        <div className={styles["comment__text"]}>
          {
            <TextTagging
              text={text || ""}
              onClick={() => {}}
              className={styles["comment__text-button"]}
            />
          }
        </div>

        <div className={styles["comment__buttons"]}>
          <LikesButton
            userIds={usersId}
            id={id}
            likeApi={likeApi(EndpointsEnum.COMMENT_LIKE)}
          />
          {!hideCommentBtn ? (
            <CommentsButton
              textValue={
                commentsCount > 1 || (commentCount && commentCount > 1)
                  ? "replies"
                  : "reply"
              }
              id={id}
              commentsCount={commentCount || commentsCount}
              setId={setId}
              nickName={nickName}
              setNickName={setNickName}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Comment;
