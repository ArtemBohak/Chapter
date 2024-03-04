import { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";

import { PostApi } from "@/src/services";
import { PostCommentsProps } from "./PostComments.type";

import { useErrorBoundary, useRefIntersection } from "@/src/hooks";
import { CommentRefType } from "@/src/services/PostApi/PostApi.type";
import styles from "./PostComments.module.scss";

import { Animation } from "@/src/components";
import { Comments, CommentsForm, FilterButton } from "./components";

const transitionClassNames = {
  enter: styles["comments-enter"],
  enterActive: styles["comments-enter-active"],
  exit: styles["comments-exit"],
  exitActive: styles["comments-exit-active"],
};

const PostComments: FC<PostCommentsProps> = ({
  commentsCount,
  comments,
  commentsIsHide,
  setCommentsIsHide,
  ...props
}) => {
  const [commentId, setCommentId] = useState<string | number | null>(null);
  const [nickName, setNickName] = useState("");
  const [allComments, setAllComments] = useState<Array<CommentRefType>>([]);
  const [page, setPage] = useState(0);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isObserving, setIsObserving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [replyToUserId, setReplyToUserId] = useState<string | number | null>(
    null
  );

  const commentsRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleIsObserving = ({ isIntersecting }: IntersectionObserverEntry) =>
    setIsObserving(isIntersecting);

  useRefIntersection(wrapperRef, handleIsObserving, {
    thresholds: [1],
  });

  const setErrorBoundary = useErrorBoundary();

  const onHandleCommentsToggle = () => {
    setCommentsIsHide && setCommentsIsHide(!commentsIsHide);
    if (!commentsIsHide) {
      setShowAllComments(false);
      setAllComments([]);
      setPage(0);
    }
  };

  useEffect(() => {
    const commentsApi = new PostApi(
      setAllComments,
      setErrorBoundary,
      setIsLoading,
      props.postId
    );
    if (isObserving) {
      commentsCount && !page && commentsApi.get();
      page && commentsApi.get(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsCount, isObserving, page, props.postId]);

  const togglerBtnClassNames = cn(styles["button"], styles["button__toggler"], {
    [styles["is-show"]]: !commentsIsHide,
  });

  return (
    <div ref={wrapperRef}>
      <div className={styles["comments__button"]}>
        {comments.length ? (
          <button
            onClick={onHandleCommentsToggle}
            data-automation="clickButton"
            className={togglerBtnClassNames}
          >{`${
            commentsIsHide ? "Show all comments" : "Hide Comments"
          } (${commentsCount})`}</button>
        ) : null}
        {comments.length ? (
          <FilterButton
            showAllComments={showAllComments}
            commentsIsHide={commentsIsHide}
            transitionClassNames={transitionClassNames}
            setShowAllComments={setShowAllComments}
          />
        ) : null}
      </div>
      <div className={styles["comments__content"]}>
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
              {...props}
              comments={showAllComments ? allComments : comments}
              showAllComments={showAllComments}
              isLoading={isLoading}
              setId={setCommentId}
              setNickName={setNickName}
              setReplyToUserId={setReplyToUserId}
              setPage={setPage}
            />
          </div>
        </Animation>
      </div>
      <div className={styles["comments__form"]}>
        <CommentsForm
          {...props}
          commentId={commentId}
          nickName={nickName}
          replyToUserId={replyToUserId}
          setCommentsIsHide={setCommentsIsHide}
          setCommentId={setCommentId}
          setReplyToUserId={setReplyToUserId}
          setNickName={setNickName}
        />
      </div>
    </div>
  );
};

export default PostComments;
