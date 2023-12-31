import { FC, createRef, useEffect, useMemo, useRef } from "react";
import { TransitionGroup } from "react-transition-group";

import { useFeedContext } from "../../context";
import styles from "./Feeds.module.scss";

import { Animation, Loader } from "@/src/components";
import Feed from "../Feed/Feed";

const Feeds: FC = () => {
  const { feeds, isLoad, setPage } = useFeedContext();
  const loaderRef = useRef(null);

  const feedsList = useMemo(
    () =>
      feeds.map((i) => ({
        ...i,
        nodeRef: createRef<HTMLDivElement>(),
      })),
    [feeds]
  );

  useEffect(() => {
    const loader = loaderRef.current;
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      console.log(target);
      if (target.isIntersecting) {
        // setPage((page) => page + 1);
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            key={i.postId}
            nodeRef={i.nodeRef}
            classNames={transitionClassNames}
            timeout={300}
          >
            <li>
              <Feed {...i} />
            </li>
          </Animation>
        ))}
      </TransitionGroup>
      <div ref={loaderRef}>
        <Loader isShown={isLoad} />
      </div>
    </>
  );
};

export default Feeds;
