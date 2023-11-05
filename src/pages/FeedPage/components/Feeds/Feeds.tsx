import { FC } from "react";

import { useFeedContext } from "../../context";
import styles from "./Feeds.module.scss";

import { Post } from "@/src/components";

const Feeds: FC = () => {
  const { feeds, fetchData } = useFeedContext();
  return (
    <ul className={styles["feeds-list"]}>
      {feeds.map((i) => (
        <li key={i.id}>
          <Post pageVariant="feed" fetchData={fetchData} {...i} />
        </li>
      ))}
    </ul>
  );
};

export default Feeds;
