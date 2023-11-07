import { FC, createRef, useMemo } from "react";

import { useFeedContext } from "../../context";
import styles from "./Feeds.module.scss";

import { Post } from "@/src/components";
import { TransitionGroup } from "react-transition-group";

const Feeds: FC = () => {
  const { feeds, fetchData } = useFeedContext();

  const feedsList = useMemo(
    () => feeds.map((i) => ({ ...i, feedRef: createRef() })),
    [feeds]
  );

  return (
    <TransitionGroup component={"ul"} className={styles["feeds-list"]}>
      {feedsList.map((i) => (
        <li key={i.id}>
          <Post pageVariant="feed" fetchData={fetchData} {...i} />
        </li>
      ))}
    </TransitionGroup>
  );
};

export default Feeds;
