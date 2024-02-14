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

const Comments: FC<CommentsProps> = ({ comments, setId }) => {
  let counter: number = 0;
  const renderComments = (comments: Array<CommentValues>, step: number) => {
    counter += step;

    if (counter > 1) return;

    const classNames = itemClassNames(counter);

    return (
      <ul className={styles["feed__list"]}>
        {comments.map((i) => {
          return (
            <li key={i.id} className={classNames}>
              <Comment {...i} setId={setId} />
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
