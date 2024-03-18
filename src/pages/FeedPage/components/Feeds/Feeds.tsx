import { FC, useRef } from "react";
import { TransitionGroup } from "react-transition-group";

import { intersectionHandlerCB } from "@/src/utils";
import { useRefIntersection } from "@/src/hooks";
import { useFeedContext } from "../../context";
import styles from "./Feeds.module.scss";

import { Animation, Loader, Post, PostSkeleton } from "@/src/components";

const Feeds: FC = () => {
  const { posts, isLoad, setPage, setPosts } = useFeedContext();
  const startLoaderRef = useRef(null);

  useRefIntersection(intersectionHandlerCB(setPage), startLoaderRef, {
    postsIsLoad: isLoad,
    threshold: 1,
  });

  const transitionClassNames = {
    enter: styles["feeds-enter"],
    enterActive: styles["feeds-enter-active"],
    exit: styles["feeds-exit"],
    exitActive: styles["feeds-exit-active"],
  };

  if (!posts.length && isLoad)
    return <PostSkeleton className={styles["skeleton"]} />;

  return (
    <>
      <div ref={startLoaderRef} data-value={1} className="hide-element" />
      <TransitionGroup component={"ul"} className={styles["feeds"]}>
        {posts.map((i) => (
          <Animation
            key={i.postId}
            nodeRef={i.nodeRef}
            classNames={transitionClassNames}
            timeout={300}
          >
            <li>
              <Post {...i} setPosts={setPosts} setPage={setPage} />
            </li>
          </Animation>
        ))}
      </TransitionGroup>
      <Loader
        isShown={!!posts.length && isLoad}
        wrapperClassNames={styles["loader"]}
        height={80}
        width={90}
      />
    </>
  );
};

export default Feeds;
