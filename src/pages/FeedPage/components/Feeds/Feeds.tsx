import { FC, createRef, useEffect, useMemo, useRef } from "react";
import { TransitionGroup } from "react-transition-group";

import { useFeedContext } from "../../context";
import styles from "./Feeds.module.scss";

import { Animation, Loader } from "@/src/components";
import Feed from "../Feed/Feed";
import { pageLimit } from "@/src/utils";

const Feeds: FC = () => {
  const { feeds, isLoad, page, setPage } = useFeedContext();
  const endLoaderRef = useRef(null);
  console.log(page);
  const feedsList = useMemo(
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
      if (
        el &&
        el.loaderRef &&
        el.loaderRef.current &&
        el.loaderRef.current.value
      ) {
        const observer = new IntersectionObserver(([entries]) => {
          if (entries.isIntersecting) {
            setPage(+el.loaderRef.current.value);
          }
        });

        observer.observe(el.loaderRef.current);
      }
    });
  }, [feedsList]);

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
      <div ref={endLoaderRef} className="invisible">
        ...
      </div>
      <Loader
        isShown={isLoad && page !== 1}
        wrapperClassNames={styles["loader"]}
        height={100}
      />
    </>
  );
};

export default Feeds;
