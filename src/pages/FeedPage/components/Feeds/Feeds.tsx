import { FC } from "react";

import styles from "./Feeds.module.scss";

import Feed from "../Feed/Feed";

const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const Feeds: FC = () => {
  return (
    <ul className={styles["feeds-list"]}>
      {ids.map((i) => (
        <li key={i}>
          <Feed />
        </li>
      ))}
    </ul>
  );
};

export default Feeds;
