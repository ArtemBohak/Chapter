import { FC, useRef } from "react";
import cn from "classnames";

import { CommentsProps } from "./Comments.type";
import { CommentValues } from "@/src/types";
import { intersectionHandlerCB } from "@/src/utils";
import { useRefIntersection } from "@/src/hooks";
import styles from "./Comments.module.scss";

import { Comment } from "./components";

const itemClassNames = (value: number) => {
  return cn(styles["feed__item"], {
    [styles["border"]]: value === 0,
    [styles["feed__sub-list-item--first"]]: value === 1,
  });
};

const Comments: FC<CommentsProps> = ({
  comments,
  showAllComments,
  postId,
  setPage,
  setId,
  setNickName,
  setReplyToUserId,
}) => {
  const startLoaderRef = useRef(null);

  useRefIntersection(startLoaderRef, intersectionHandlerCB(setPage), {
    commentsIsShow: showAllComments,
    thresholds: [1],
  });

  const renderComments = (comments: Array<CommentValues>, step: number) => {
    let counter: number = 0;

    counter += step;

    if (counter > 1) return;

    const sortedComments = counter
      ? comments.sort((a, b) => {
          const firstEl = new Date(a.createdAt).getTime();
          const secondEl = new Date(b.createdAt).getTime();

          return firstEl - secondEl;
        })
      : comments;

    const classNames = itemClassNames(counter);

    return (
      <>
        {showAllComments && !counter ? (
          <div ref={startLoaderRef} data-value={1}></div>
        ) : null}
        <ul className={styles["feed__list"]}>
          {sortedComments.map((i) => {
            return (
              <li key={i.id} className={classNames}>
                <Comment
                  {...i}
                  setId={setId}
                  setNickName={setNickName}
                  setReplyToUserId={setReplyToUserId}
                  setPage={setPage}
                  postId={postId}
                />
                {i.comments?.length ? renderComments(i.comments, 1) : null}
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return renderComments(comments, 0);
};

export default Comments;
