import { FC } from "react";

import { CommentsProps, CommentsArray } from "./Comments.type";
import styles from "./Comments.module.scss";

import { Comment } from "./components";

let counter: number = 0;

const Comments: FC<CommentsProps> = (props) => {
  const renderComments = (comments: CommentsArray, count = 1) => {
    counter += count;

    if (counter > 3) return null;

    return (
      <ul className={styles["feed__list"]}>
        {comments.map((i) => (
          <li key={i.id} className={styles["feed__item"]}>
            <Comment {...i} />
            {i.comments && renderComments(i.comments)}
          </li>
        ))}
      </ul>
    );
  };

  return renderComments(props.comments);
};

export default Comments;
