import { FC } from "react";
import cn from "classnames";

import { CommentsProps } from "./Comments.type";
import { CommentValues } from "@/src/types";
import styles from "./Comments.module.scss";

import { Comment } from "./components";

const itemClassNames = (value: number) => {
  return cn(styles["feed__item"], {
    [styles["border"]]: value === 0,
    [styles["feed__sub-list-item--first"]]: value === 1,
  });
};

const Comments: FC<CommentsProps> = ({
  comments,
  showAllComments,
  postId,
  setId,
  setNickName,
  setReplyToUserId,
}) => {
  const renderComments = (comments: Array<CommentValues>, step: number) => {
    let counter: number = 0;

    counter += step;

    if (counter > 1) return;

    const sortedComments = comments.sort((a, b) => {
      const firstEl = new Date(a.createdAt).getTime();
      const secondEl = new Date(b.createdAt).getTime();

      if (!counter && !showAllComments) {
        return secondEl - firstEl;
      }
      return firstEl - secondEl;
    });

    const classNames = itemClassNames(counter);

    return (
      <ul className={styles["feed__list"]}>
        {sortedComments.map((i) => {
          return (
            <li key={i.id} className={classNames}>
              <Comment
                {...i}
                setId={setId}
                setNickName={setNickName}
                setReplyToUserId={setReplyToUserId}
                postId={postId}
              />
              {i.comments?.length ? renderComments(i.comments, 1) : null}
            </li>
          );
        })}
      </ul>
    );
  };

  return renderComments(comments, 0);
};

export default Comments;
