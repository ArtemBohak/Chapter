import { FC } from "react";
import cn from "classnames";

import { CommentsProps, CommentsArray } from "./Comments.type";
import styles from "./Comments.module.scss";

import { Comment } from "./components";

const Comments: FC<CommentsProps> = ({ comments }) => {
  let counter: number = 0;

  function renderComments(comments: CommentsArray, step = 1) {
    counter += step;

    if (counter > 3) return;

    const itemClassNames = cn(styles["feed__item"], {
      [styles["border"]]: counter === 0,
      [styles["feed__sub-list-item--first"]]: counter === 1,
      [styles["feed__sub-list-item--second"]]: counter === 2,
      [styles["feed__sub-list-item--third"]]: counter === 3,
    });
    const hideCommentBtn = counter === 3;
    return (
      <ul className={styles["feed__list"]}>
        {comments.map((i) => (
          <li key={i.id} className={itemClassNames}>
            <Comment {...i} hideCommentBtn={hideCommentBtn} />
            {i.comments && renderComments(i.comments)}
          </li>
        ))}
      </ul>
    );
  }

  return renderComments(comments, 0);
};

export default Comments;
