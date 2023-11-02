import { FC } from "react";

import { CommentsProps } from "./Comments.type";
import styles from "./Comments.module.scss";

import { Comment } from "./components";

const Comments: FC<CommentsProps> = ({ comments }) => {
  return (
    <ul className={styles["feed__list"]}>
      {comments.map((i) => (
        <li key={i.id} className={styles["feed__item"]}>
          <Comment {...i} />
          {i.subComments && i.subComments.length ? (
            <ul className={styles["feed__sub-list-item"]}>
              {i.subComments.map((i) => (
                <li key={i.id}>
                  <Comment {...i} />
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default Comments;
