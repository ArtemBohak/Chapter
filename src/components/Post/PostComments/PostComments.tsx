import { FC, useMemo, useRef, useState } from "react";
import cn from "classnames";

import { PostCommentsProps } from "./PostComments.type";
import { tabScreen } from "@/src/utils";
import { useGetScreenSize, useOutsideClick } from "@/src/hooks";
import styles from "./PostComments.module.scss";

import { Animation, Icon, IconEnum, PopUpMenu } from "@/src/components";
import { Comments, CommentsForm } from "./components";

const filterValue = { latest: "Latest comments", all: "All comments" };

const PostComments: FC<PostCommentsProps> = ({
  commentsCount,
  postId,
  comments,
  commentsIsHide,
  setCommentsIsHide,
  setFeeds,
}) => {
  const [commentId, setCommentId] = useState<string | number | null>(null);
  const [nickName, setNickName] = useState("");
  const [replyToUserId, setReplyToUserId] = useState<string | number | null>(
    null
  );

  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);

  const btnRef = useRef(null);
  const commentsRef = useRef(null);
  const popupRef = useRef(null);

  const [screenSize] = useGetScreenSize();
  const isMobScreen = screenSize < tabScreen ? 16 : 26;

  useOutsideClick(popupRef, setShowFilterPopup, "filter-btn");

  const sortedComments = useMemo(
    () =>
      comments.sort((a, b) => {
        const firstEl = new Date(a.createdAt).getTime();
        const secondEl = new Date(b.createdAt).getTime();
        if (!showAllComments) return secondEl - firstEl;

        return firstEl - secondEl;
      }),
    [comments, showAllComments]
  );

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

  const renderFilterBtn = comments.length ? (
    <Animation
      in={!commentsIsHide}
      nodeRef={btnRef}
      classNames={transitionClassNames}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles["feed-comments__button-filter-wrapper"]}>
        <button
          data-automation="clickButton"
          className={`${filterBtnClassNames}`}
          ref={btnRef}
          id="filter-btn"
          onClick={() => setShowFilterPopup(!showFilterPopup)}
        >
          {showAllComments ? filterValue.all : filterValue.latest}
          <Icon
            className={`${styles["feed-comments__button-filter-icon"]} ${
              showFilterPopup ? styles["icon"] : ""
            }`}
            icon={IconEnum.Back}
            size={isMobScreen}
          />
        </button>
        <PopUpMenu
          nodeRef={popupRef}
          isOpen={showFilterPopup}
          setIsOpen={setShowFilterPopup}
          backdropClassName={styles["popup"]}
          bodyClassName={styles["popup__body"]}
          contentWrapperClassNames={styles["popup__content"]}
        >
          <button
            data-automation="clickButton"
            onClick={() => {
              setShowFilterPopup(false);
              setShowAllComments(!showAllComments);
            }}
          >
            {showAllComments ? filterValue.latest : filterValue.all}
          </button>
        </PopUpMenu>
      </div>
    </Animation>
  ) : null;

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
        <Comments
          comments={
            showAllComments ? sortedComments : sortedComments.slice(0, 3)
          }
          setId={setCommentId}
          setNickName={setNickName}
          setReplyToUserId={setReplyToUserId}
          showAllComments={showAllComments}
        />
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
          nickName={nickName}
          replyToUserId={replyToUserId}
          setCommentsIsHide={setCommentsIsHide}
          setCommentId={setCommentId}
          setFeeds={setFeeds}
          setReplyToUserId={setReplyToUserId}
          setNickName={setNickName}
        />
      </div>
    </div>
  );
};

export default PostComments;
