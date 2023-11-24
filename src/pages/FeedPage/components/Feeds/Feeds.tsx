import { FC, createRef, useMemo } from "react";
import { TransitionGroup } from "react-transition-group";

import { useFeedContext } from "../../context";
import styles from "./Feeds.module.scss";

import { Animation, FeedComponent } from "@/src/components";

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
  const transitionClassNames = {
    enter: styles["feeds-list-enter"],
    enterActive: styles["feeds-list-enter-active"],
    exit: styles["feeds-list-exit"],
    exitActive: styles["feeds-list-exit-active"],
  };
  return (
    <TransitionGroup component={"ul"} className={styles["feeds-list"]}>
      {feedsList.map((i) => (
        <Animation
          key={i.id}
          nodeRef={i.nodeRef}
          classNames={transitionClassNames}
          timeout={300}
        >
          <li>
            <FeedComponent fetchData={fetchData} {...i} />
          </li>
        </Animation>
      ))}
    </TransitionGroup>
  );
};

export default Feeds;
