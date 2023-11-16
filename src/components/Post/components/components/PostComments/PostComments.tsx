import { FC, useRef, useState } from "react";
import cn from "classnames";

import { PostCommentsProps } from "./PostComments.type";

import { useGetScreenSize } from "@/src/hooks";
import styles from "./PostComments.module.scss";

import { Animation, Icon, IconEnum } from "@/src/components";
import { Comments, Form } from "./components";

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
    text: "Thank you for sharing your impressions of the book, I agree with @Vilkkyyyy, it was just a great post! Full of magic and enchantment. I read it with pleasure and look forward to the new one!",
    likesList: [1, 2, 168],
    comments: [
      {
        id: 0,
        totalComments: 10,
        totalLikes: 10,
        avatar: null,
        firstName: "Alex",
        lastName: "Reeves",
        nickName: "@maryreeves",
        date: Date.now() - 10002102,
        text: "It's a shame that the Harry Potter books are over 😭",
        likesList: [1, 2, 168],
      },
      {
        id: 1,
        totalComments: 10,
        totalLikes: 10,
        avatar: null,
        firstName: "Marta",
        lastName: "Reeves",
        nickName: "@maryreeves",
        date: Date.now() - 10002102,
        text: "It's a shame that the Harry Potter books are over 😭",
        likesList: [1, 2, 168],
        comments: [
          {
            id: 0,
            totalComments: 10,
            totalLikes: 10,
            avatar: null,
            firstName: "Alex",
            lastName: "Reeves",
            nickName: "@maryreeves",
            date: Date.now() - 10002102,
            text: "It's a shame that the Harry Potter books are over 😭",
            likesList: [1, 2, 168],
          },
          {
            id: 1,
            totalComments: 10,
            totalLikes: 10,
            avatar: null,
            firstName: "Marta",
            lastName: "Reeves",
            nickName: "@maryreeves",
            date: Date.now() - 10002102,
            text: "It's a shame that the Harry Potter books are over 😭",
            likesList: [1, 2, 168],
            comments: [
              {
                id: 0,
                totalComments: 10,
                totalLikes: 10,
                avatar: null,
                firstName: "Alex",
                lastName: "Reeves",
                nickName: "@maryreeves",
                date: Date.now() - 10002102,
                text: "It's a shame that the Harry Potter books are over 😭",
                likesList: [1, 2, 168],
              },
              {
                id: 1,
                totalComments: 10,
                totalLikes: 10,
                avatar: null,
                firstName: "Marta",
                lastName: "Reeves",
                nickName: "@maryreeves",
                date: Date.now() - 10002102,
                text: "It's a shame that the Harry Potter books are over 😭",
                likesList: [1, 2, 168],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    totalComments: 10,
    totalLikes: 10,
    avatar: null,
    firstName: "Mary",
    lastName: "Reeves",
    nickName: "@maryreeves",
    date: Date.now() - 10002102111,
    text: "It's a shame that the Harry Potter books are over 😭",
    likesList: [1, 2, 168],
  },
  {
    id: 2,
    totalComments: 110,
    totalLikes: 120,
    avatar: null,
    firstName: "Mary",
    lastName: "Reeves",
    nickName: "@maryreeves",
    date: Date.now() - 1002111,
    text: "It's a shame that the Harry Potter books are over 😭",
    likesList: [1, 2, 168],
  },
];

const PostComments: FC<PostCommentsProps> = ({
  totalComments = 0,
  id,
  fetchData,
}) => {
  const [commentsIsHide, setCommentsIsHide] = useState(true);
  const btnRef = useRef(null);
  const commentsRef = useRef(null);
  const [screenSize] = useGetScreenSize();

  const isMobScreen = screenSize < 769 ? 16 : 26;

  const onHandleCommentsToggle = async () => {
    if (commentsIsHide) {
      fetchData && fetchData(id);
    }
    setCommentsIsHide(!commentsIsHide);
  };

  const togglerBtnClassNames = cn(
    styles["feed-comments__button"],
    styles["feed-comments__button-toggler"],
    { [styles["is-show"]]: !commentsIsHide }
  );
  const filterBtnClassNames = `${styles["feed-comments__button"]} ${styles["feed-comments__button-filter"]}`;

  const transitionClassNames = {
    enter: styles["feed-comments-enter"],
    enterActive: styles["feed-comments-enter-active"],
    exit: styles["feed-comments-exit"],
    exitActive: styles["feed-comments-exit-active"],
  };

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
      classNames={transitionClassNames}
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
      <div className={styles["feed-comments__form-wrapper"]}>
        <Form id={id} fetchData={fetchData} />
      </div>
    </div>
  );
};

export default PostComments;
