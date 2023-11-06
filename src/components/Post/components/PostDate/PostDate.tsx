import { FC } from "react";

import { formatDate } from "@/src/utils";
import { PostDateProps } from "./PostDate.type";
import styles from "./PostDate.module.scss";

const PostDate: FC<PostDateProps> = ({ date, firstName, lastName }) => {
  return (
    <p className={styles["date"]}>
      <span className={styles["date__text"]}>
        by{" "}
        <span className={styles["date__text--accent"]}>
          {firstName} {lastName}
        </span>{" "}
        |{" "}
      </span>
      {formatDate(date)}
    </p>
  );
};

export default PostDate;
