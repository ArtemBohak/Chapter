import { FC } from "react";

import { PostFullNameProps } from "./PostFullName.type";
import styles from "./PostFullName.module.scss";

const PostFullName: FC<PostFullNameProps> = ({ firstName, lastName }) => {
  return (
    <p className={styles["name"]}>
      <span className={styles["name__text"]}>
        by{" "}
        <span className={styles["name__text--accent"]}>
          {firstName} {lastName}
        </span>{" "}
        |
      </span>
    </p>
  );
};

export default PostFullName;
