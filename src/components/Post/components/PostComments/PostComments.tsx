import { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";

import { PostApi } from "@/src/services";
import { PostCommentsProps } from "./PostComments.type";
import { useErrorBoundary } from "@/src/hooks";
import { HandleNickname, CommentRefType } from "@/src/types";
import styles from "./PostComments.module.scss";

import { Animation, Loader } from "@/src/components";
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

  const [isLoading, setIsLoading] = useState(false);
  const [replyToUserId, setReplyToUserId] = useState<string | number | null>(
    null
  );

  const commentsRef = useRef(null);
  const wrapperRef = useRef(null);

  const setErrorBoundary = useErrorBoundary();

  const onHandleCommentsToggle = () => {
    setCommentsIsHide(!commentsIsHide);
    if (!commentsIsHide) {
      setShowAllComments(false);
      setAllComments([]);
      setPage(0);
    }
  };

  const handleNickname: HandleNickname = (
    id?: string | number,
    nickname?: string | undefined,
    authorId?: string | undefined | null | number
  ) => {
    if (id && nickname && authorId) {
      setCommentId(id);
      setNickName(nickname);
      return setReplyToUserId(authorId);
    }

    setNickName("");
    setReplyToUserId(null);
    setCommentId(null);
  };

  useEffect(() => {
    const commentsApi = new PostApi(
      setAllComments,
      setErrorBoundary,
      setIsLoading,
      props.postId
    );
    if (commentsCount) {
      !commentsIsHide && !page && commentsApi.get();
      page && commentsApi.get(page);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsCount, commentsIsHide, page, props.postId]);

  const togglerBtnClassNames = cn(styles["button"], styles["button__toggler"], {
    [styles["is-show"]]: !commentsIsHide,
  });

  return (
    <div className={styles["comments"]} ref={wrapperRef}>
      <div className={styles["comments__button"]}>
        {comments.length ? (
          <button
            onClick={onHandleCommentsToggle}
            data-automation="clickButton"
            className={togglerBtnClassNames}
            aria-label="Toggler comment button"
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
              setPage={setPage}
              handleNickname={handleNickname}
              setAllComments={setAllComments}
            />
          </div>
        </Animation>
      </div>
      <div className={styles["comments__form"]}>
        <Loader
          isShown={showAllComments && isLoading}
          wrapperClassNames={styles["loader"]}
          height={40}
          width={40}
          color="#6C6C6C"
        />
        <CommentsForm
          {...props}
          commentId={commentId}
          nickName={nickName}
          replyToUserId={replyToUserId}
          setCommentsIsHide={setCommentsIsHide}
          handleNickname={handleNickname}
        />
      </div>
    </div>
  );
};

export default PostComments;
