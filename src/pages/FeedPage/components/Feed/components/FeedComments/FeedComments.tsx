import { FC, useRef, useState } from "react";
import cn from "classnames";

import { FeedCommentsProps } from "./FeedComments.type";
import { useFeedContext } from "@/src/pages/FeedPage/context";
import { useGetScreenSize } from "@/src/hooks";
import styles from "./FeedComments.module.scss";

import { Animation, Icon, IconEnum } from "@/src/components";
import Comments from "./components/Comments/Comments";

const comments = [
  {
    id: 0,
    totalComments: 10,
    totalLikes: 10,
    avatar: null,
    firstName: "Mary",
    lastName: "Reeves",
    nickName: "@maryreeves",
    date: Date.now() - 10002102111,
    text: "It's a shame that the Harry Potter books are over 😭",
    likesList: [1, 2, 168],
    subComments: [
      {
        id: 0,
        totalComments: 10,
        totalLikes: 10,
        avatar: null,
        firstName: "Mary",
        lastName: "Reeves",
        nickName: "@maryreeves",
        date: Date.now() - 10002102,
        text: "It's a shame that the Harry Potter books are over 😭",
        likesList: [1, 2, 168],
      },
    ],
  },
];

const FeedComments: FC<FeedCommentsProps> = ({ totalComments = 0, id }) => {
  const { fetchData } = useFeedContext();
  const [commentsIsHide, setCommentsIsHide] = useState(true);
  const btnRef = useRef(null);
  const commentsRef = useRef(null);
  const [screenSize] = useGetScreenSize();

  const isMobScreen = screenSize < 769 ? 16 : 26;

  const onHandleCommentsToggle = async () => {
    if (commentsIsHide) {
      fetchData(id);
    }
    setCommentsIsHide(!commentsIsHide);
  };

  const togglerBtnClassNames = cn(
    styles["feed-comments__button"],
    styles["feed-comments__button-toggler"],
    { [styles["is-show"]]: !commentsIsHide }
  );
  const filterBtnClassNames = `${styles["feed-comments__button"]} ${styles["feed-comments__button-filter"]}`;

  const renderTogglerBtn = (
    <button
      onClick={onHandleCommentsToggle}
      data-automation="clickButton"
      className={togglerBtnClassNames}
    >{`${
      commentsIsHide ? "Show all comments" : "Hide Comments"
    } (${totalComments})`}</button>
  );

  const renderFilterBtn = (
    <Animation
      isMount={!commentsIsHide}
      nodeRef={btnRef}
      mountOnEnter
      unmountOnExit
    >
      <button
        data-automation="clickButton"
        className={filterBtnClassNames}
        ref={btnRef}
      >
        Latest comments
        <Icon
          className={styles["feed-comments__button-filter-icon"]}
          icon={IconEnum.Back}
          size={isMobScreen}
        />
      </button>
    </Animation>
  );

  const transitionClassNames = {
    enter: styles["feed-comments-enter"],
    enterActive: styles["feed-comments-enter-active"],
    exit: styles["feed-comments-exit"],
    exitActive: styles["feed-comments-exit-active"],
  };

  const renderComments = (
    <Animation
      isMount={!commentsIsHide}
      nodeRef={commentsRef}
      timeout={300}
      classNames={transitionClassNames}
      mountOnEnter
      unmountOnExit
    >
      <div ref={commentsRef}>
        <Comments comments={comments} />
      </div>
    </Animation>
  );

  return (
    <div className={styles["feed-comments"]}>
      <div className={styles["feed-comments__text-wrapper"]}>
        {renderTogglerBtn}
        {renderFilterBtn}
      </div>
      <div className={styles["feed-comments__content-wrapper"]}>
        {renderComments}
      </div>
    </div>
  );
};

export default FeedComments;
