import { FC, createRef, useEffect, useMemo, useRef } from "react";
import { TransitionGroup } from "react-transition-group";

import { FeedProps } from "../Feed/Feed.type";
import { useFeedContext } from "../../context";
import { pageLimit } from "@/src/utils";
import styles from "./Feeds.module.scss";

import { Animation, Loader, PostSkeleton } from "@/src/components";

import Feed from "../Feed/Feed";

const Feeds: FC = () => {
  const { feeds, isLoad, setPage } = useFeedContext();
  const endLoaderRef = useRef(null);

  const feedsList: FeedProps[] = useMemo(
    () =>
      feeds.map((el, i) => {
        if ((i + 1) % pageLimit === 0)
          return {
            ...el,
            nodeRef: createRef<HTMLDivElement>(),
            loaderRef: createRef<HTMLInputElement>(),
            pageValue: Math.ceil(feeds.length / pageLimit),
          };

        return {
          ...el,
          nodeRef: createRef<HTMLDivElement>(),
        };
      }),
    [feeds]
  );

  useEffect(() => {
    const loader = endLoaderRef.current;
    const observer = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting && !isLoad) {
        setPage((page) => (page += 1));
      }
    });

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endLoaderRef.current, isLoad]);

  useEffect(() => {
    feedsList.forEach((el) => {
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
  }, [feedsList, setPage]);

  const transitionClassNames = {
    enter: styles["feeds-list-enter"],
    enterActive: styles["feeds-list-enter-active"],
    exit: styles["feeds-list-exit"],
    exitActive: styles["feeds-list-exit-active"],
  };

  if (!feeds.length) return <PostSkeleton />;

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
              <Feed {...i} nodeRef={i.nodeRef} />
            </li>
          </Animation>
        ))}
      </TransitionGroup>
      <div ref={endLoaderRef} className="invisible">
        ...
      </div>
      <Loader
        isShown={!!feeds.length && isLoad}
        wrapperClassNames={styles["loader"]}
        height={100}
      />
    </>
  );
};

export default Feeds;
