import { FC } from "react";

import { LikesProps } from "./Likes.type";
import styles from "./Likes.module.scss";

import { Like } from "./components";

const Likes: FC<LikesProps> = ({ likesData = [], ...props }) => {
  return (
    <ul className={styles["likes-list"]}>
      {likesData.map((i) => (
        <li key={i.id}>
          <Like {...i} {...props} />
        </li>
      ))}
    </ul>
  );
};

export default Likes;
