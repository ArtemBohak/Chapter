import { FC, useRef, useState } from "react";
import cn from "classnames";

import { PostCommentsProps } from "./PostComments.type";
import { tabScreen } from "@/src/utils";
import { useGetScreenSize } from "@/src/hooks";
import styles from "./PostComments.module.scss";

import { Animation, Icon, IconEnum } from "@/src/components";
import { Comments, CommentsForm } from "./components";

const PostComments: FC<PostCommentsProps> = ({
  commentsCount,
  postId,
  comments,
  commentsIsHide,
  setCommentsIsHide,
}) => {
  const [commentId, setCommentId] = useState<string | number | null>(null);
  const btnRef = useRef(null);
  const commentsRef = useRef(null);
  const [screenSize] = useGetScreenSize();

  const isMobScreen = screenSize < tabScreen ? 16 : 26;

  const onHandleCommentsToggle = async () => {
    setCommentsIsHide && setCommentsIsHide(!commentsIsHide);
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

  const renderTogglerBtn = comments.length ? (
    <button
      onClick={onHandleCommentsToggle}
      data-automation="clickButton"
      className={togglerBtnClassNames}
    >{`${
      commentsIsHide ? "Show all comments" : "Hide Comments"
    } (${commentsCount})`}</button>
  ) : null;

  const renderFilterBtn = (
    <Animation
      in={!commentsIsHide}
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
      in={!commentsIsHide}
      nodeRef={commentsRef}
      timeout={300}
      classNames={transitionClassNames}
      mountOnEnter
      unmountOnExit
    >
      <div ref={commentsRef}>
        <Comments comments={comments} setId={setCommentId} />
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
        <CommentsForm
          postId={postId}
          commentId={commentId}
          setCommentsIsHide={setCommentsIsHide}
        />
      </div>
    </div>
  );
};

export default PostComments;
