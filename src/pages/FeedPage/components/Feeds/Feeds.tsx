import { FC, createRef, useMemo } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { useFeedContext } from "../../context";
import styles from "./Feeds.module.scss";

import { Post } from "@/src/components";

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
  const transition = {
    enter: styles["feeds-list-enter"],
    enterActive: styles["feeds-list-enter-active"],
    exit: styles["feeds-list-exit"],
    exitActive: styles["feeds-list-exit-active"],
  };
  return (
    <TransitionGroup component={"ul"} className={styles["feeds-list"]}>
      {feedsList.map((i) => (
        <CSSTransition
          key={i.id}
          timeout={300}
          classNames={transition}
          nodeRef={i.nodeRef}
        >
          <li>
            <Post pageVariant="feed" fetchData={fetchData} {...i} />
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default Feeds;
