import { FC, createRef, useMemo } from "react";
import { TransitionGroup } from "react-transition-group";

import { useFeedContext } from "../../context";
import styles from "./Feeds.module.scss";

import { Animation, Post } from "@/src/components";

const Feeds: FC = () => {
  const { feeds, fetchData } = useFeedContext();

  const feedsList = useMemo(
    () =>
      feeds.map((i) => ({
        ...i,
        nodeRef: createRef<HTMLDivElement>(),
      })),
    [feeds]
  );

  return (
    <TransitionGroup component={"ul"} className={styles["feeds-list"]}>
      {feedsList.map((i) => (
        <Animation key={i.id} nodeRef={i.nodeRef}>
          <li>
            <Post pageVariant="feed" fetchData={fetchData} {...i} />
          </li>
        </Animation>
      ))}
    </TransitionGroup>
  );
};

export default Feeds;
