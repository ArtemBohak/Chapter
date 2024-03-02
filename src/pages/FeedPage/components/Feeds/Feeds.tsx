import { FC, useRef } from "react";
import { TransitionGroup } from "react-transition-group";

import { useFeedContext } from "../../context";
import { useRefIntersection } from "@/src/hooks";
import styles from "./Feeds.module.scss";

import { Animation, Loader, PostSkeleton } from "@/src/components";

import Feed from "../Feed/Feed";

const Feeds: FC = () => {
  const { feeds, isLoad, setPage } = useFeedContext();
  const startLoaderRef = useRef(null);

  useRefIntersection(startLoaderRef, setPage, {
    postsIsLoad: isLoad,
    thresholds: [1],
  });

  const transitionClassNames = {
    enter: styles["feeds-list-enter"],
    enterActive: styles["feeds-list-enter-active"],
    exit: styles["feeds-list-exit"],
    exitActive: styles["feeds-list-exit-active"],
  };

  if (!feeds.length && isLoad)
    return <PostSkeleton className={styles["skeleton"]} />;

  return (
    <>
      <input className="hide-element" ref={startLoaderRef} defaultValue={1} />
      <TransitionGroup component={"ul"} className={styles["feeds-list"]}>
        {feeds.map((i) => (
          <Animation
            key={i.postId}
            nodeRef={i.nodeRef}
            classNames={transitionClassNames}
            timeout={300}
          >
            <li>
              <Feed {...i} nodeRef={i.nodeRef} />
            </li>
          </Animation>
        ))}
      </TransitionGroup>
      <Loader
        isShown={!!feeds.length && isLoad}
        wrapperClassNames={styles["loader"]}
        height={80}
        width={90}
      />
    </>
  );
};

export default Feeds;
