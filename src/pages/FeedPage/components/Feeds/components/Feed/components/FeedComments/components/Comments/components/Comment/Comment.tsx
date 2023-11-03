import { FC } from "react";

import { CommentProps } from "./Comment.type";
import { getDate } from "@/src/utils";
import styles from "./Comment.module.scss";

import { LikesButton, CommentsButton } from "../../../../../";

import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Comment: FC<CommentProps> = ({
  avatar,
  totalComments,
  totalLikes,
  firstName,
  lastName,
  date,
  nickName,
  likesList,
  id,
  text,
}) => {
  const avatarUrl = avatar ? avatar : defaultAvatar;

  const onHandleTagClick = () => {};

  const formattedText = text.addNode(
    "@",
    onHandleTagClick,
    `${styles["comment__text-button"]}`
  );
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
          <p>{getDate(date)}</p>
        </div>
        <div className={styles["comment__text"]}>
          <p>{formattedText}</p>
        </div>
        <div className={styles["comment__buttons"]}>
          <LikesButton likesList={likesList} totalLikes={totalLikes} id={id} />
          <CommentsButton
            textValue={totalComments > 1 ? "replies" : "reply"}
            id={id}
            totalComments={totalComments}
          />
        </div>
      </div>
    </div>
  );
};

export default Comment;
