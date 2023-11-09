import { FC } from "react";
import cn from "classnames";

import { CommentsProps, CommentsArray } from "./Comments.type";
import styles from "./Comments.module.scss";

import { Comment } from "./components";

const itemClassNames = (value: number) => {
  return cn(styles["feed__item"], {
    [styles["border"]]: value === 0,
    [styles["feed__sub-list-item--first"]]: value === 1,
    [styles["feed__sub-list-item--second"]]: value === 2,
    [styles["feed__sub-list-item--third"]]: value === 3,
  });
};

const Comments: FC<CommentsProps> = ({ comments }) => {
  let counter: number = 0;

  const renderComments = (comments: CommentsArray, step = 1) => {
    counter += step;

    if (counter > 3) return;

    const classNames = itemClassNames(counter);

    const hideCommentBtn = counter === 3;

    return (
      <ul className={styles["feed__list"]}>
        {comments.map((i) => (
          <li key={i.id} className={classNames}>
            <Comment {...i} hideCommentBtn={hideCommentBtn} />
            {i.comments ? renderComments(i.comments) : null}
          </li>
        ))}
      </ul>
    );
  };

  return renderComments(comments, 0);
};

export default Comments;
