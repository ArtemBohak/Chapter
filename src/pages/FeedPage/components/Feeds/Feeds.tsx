import { FC, useEffect } from "react";
import { TransitionGroup } from "react-transition-group";

import { useFeedContext } from "../../context";
import styles from "./Feeds.module.scss";

import { Animation, Loader, PostSkeleton } from "@/src/components";

import Feed from "../Feed/Feed";

const Feeds: FC = () => {
  const { feeds, isLoad, setPage } = useFeedContext();

  useEffect(() => {
    feeds.forEach((el) => {
      const observer = new IntersectionObserver(([entries]) => {
        if (
          entries.isIntersecting &&
          el &&
          el.loaderRef &&
          el.loaderRef.current
        ) {
          setPage(+el.loaderRef.current.value);
        }
      });
      if (el && el.loaderRef && el.loaderRef.current)
        observer.observe(el.loaderRef.current);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feeds]);

  const transitionClassNames = {
    enter: styles["feeds-list-enter"],
    enterActive: styles["feeds-list-enter-active"],
    exit: styles["feeds-list-exit"],
    exitActive: styles["feeds-list-exit-active"],
  };

  if (!feeds.length && isLoad) return <PostSkeleton />;

  return (
    <>
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
