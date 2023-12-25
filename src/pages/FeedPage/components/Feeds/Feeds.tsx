import { FC, createRef, useMemo } from "react";
import { TransitionGroup } from "react-transition-group";

import { useFeedContext } from "../../context";
import styles from "./Feeds.module.scss";

import { Animation, Loader } from "@/src/components";
import Feed from "../Feed/Feed";

const Feeds: FC = () => {
  const { feeds, fetchData, isLoad } = useFeedContext();

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
    <>
      <TransitionGroup component={"ul"} className={styles["feeds-list"]}>
        {feedsList.map((i) => (
          <Animation
            key={i.id}
            nodeRef={i.nodeRef}
            classNames={transitionClassNames}
            timeout={300}
          >
            <li>
              <Feed fetchData={fetchData} {...i} />
            </li>
          </Animation>
        ))}
      </TransitionGroup>
      <Loader isShown={isLoad} />
    </>
  );
};

export default Feeds;
