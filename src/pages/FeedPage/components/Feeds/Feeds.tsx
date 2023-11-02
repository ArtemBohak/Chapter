import { FC } from "react";

import { useFeedContext } from "../../context";
import styles from "./Feeds.module.scss";

import { Feed } from "./components";

const Feeds: FC = () => {
  const { feeds } = useFeedContext();
  return (
    <ul className={styles["feeds-list"]}>
      {feeds.map((i) => (
        <li key={i.id}>
          <Feed {...i} />
        </li>
      ))}
    </ul>
  );
};

export default Feeds;
