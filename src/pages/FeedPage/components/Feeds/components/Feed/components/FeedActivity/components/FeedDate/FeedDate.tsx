import { FC } from "react";

import { formatDate } from "@/src/utils";
import { FeedDateProps } from "./FeedDate.type";
import styles from "./FeedDate.module.scss";

const FeedDate: FC<FeedDateProps> = ({ date, firstName, lastName }) => {
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

export default FeedDate;
