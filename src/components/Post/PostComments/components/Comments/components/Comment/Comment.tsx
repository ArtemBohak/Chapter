import { FC, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AxiosError } from "axios";

import { ElementsId } from "@/src/types";
import { FeedType } from "@/src/utils/callBacks/callBacks.type";
import { CommentProps } from "./Comment.type";
import { EndpointsEnum, api } from "@/src/axios";
import { getDate, intersectionHandlerCB, postsCB, scrollTo } from "@/src/utils";
import {
  useErrorBoundary,
  useOutsideClick,
  useRefIntersection,
} from "@/src/hooks";
import { useAppSelector } from "@/src/redux";
import styles from "./Comment.module.scss";

import { Icon, IconEnum, PopUpMenu, TextTagging } from "@/src/components";
import { LikesButton, CommentsButton } from "../../../../..";

import defaultAvatar from "@/src/assets/SVG/default-user-avatar.svg";

const Comment: FC<CommentProps> = ({
  author: { avatar, firstName, lastName, nickName, id: authorId },
  commentsCount,
  commentCount,
  usersId,
  id,
  text,
  createdAt,
  hideCommentBtn = false,
  replyTo,
  postId,
  pageValue,
  nodeRef,
  handleNickname,
  handleCommentsData,
  setPage,
  setFeeds,
}) => {
  const [isShown, setIsShown] = useState(false);
  const userId = useAppSelector((state) => state.userSlice.user.id);

  const navId = authorId !== userId ? `/${authorId}` : "#";

  const avatarUrl = avatar ? avatar : defaultAvatar;

  const popupRef = useRef(null);

  useOutsideClick(popupRef, setIsShown);

  useRefIntersection(nodeRef, intersectionHandlerCB(setPage), {
    thresholds: [1],
  });
  const setErrorBoundary = useErrorBoundary();

  const onHandleClick = () => {
    setIsShown(!isShown);
  };
  const onHandleEdit = () => {
    setIsShown(false);
    handleCommentsData(id, text, replyTo);
    scrollTo(ElementsId.POST_FORM + postId);
  };
  const onHandleDelete = async () => {
    try {
      const res = await api.delete(EndpointsEnum.DELETE_COMMENTS + id);
      res.data;
      setFeeds;
      postsCB<FeedType>;
      // setFeeds && setFeeds(postsCB<FeedType>(res.data, "postId"));
    } catch (e) {
      if (e instanceof AxiosError) {
        setErrorBoundary(e);
      }
    } finally {
      setIsShown(false);
    }
  };

  return (
    <div className={styles["comment"]}>
      <div
        className="hide-element"
        ref={nodeRef}
        data-value={nodeRef && pageValue ? pageValue : ""}
      />
      <Link to={navId} className={styles["comment__image"]}>
        <img src={avatarUrl} alt="user avatar" width={44} height={44} />
      </Link>
      <div className={styles["comment__content"]}>
        <div className={styles["comment__data"]}>
          <Link to={navId} className={styles["comment__user"]}>
            <h5>
              {firstName} {lastName}
            </h5>
            <p>{nickName}</p>
          </Link>
          <p>{getDate(createdAt)}</p>
        </div>
        <div className={styles["comment__text"]}>
          <TextTagging
            replyTo={replyTo}
            text={text || ""}
            className={styles["comment__text-button"]}
            linkClassName={styles["comment__text-link"]}
          />
        </div>
        <div className={styles["comment__buttons"]}>
          <LikesButton
            userIds={usersId}
            id={id}
            url={EndpointsEnum.COMMENT_LIKE}
            withoutModal
          />
          {!hideCommentBtn ? (
            <CommentsButton
              postId={postId}
              textValue={
                commentsCount > 1 || (commentCount && commentCount > 1)
                  ? "replies"
                  : "reply"
              }
              id={id}
              commentsCount={commentCount || commentsCount}
              nickName={nickName}
              authorId={authorId}
              handleNickname={handleNickname}
            />
          ) : null}
          {authorId === userId ? (
            <div className={styles["edit-comment"]}>
              <button
                onClick={onHandleClick}
                data-automation="clickButton"
                className={styles["edit-comment__button"]}
              >
                <Icon
                  id="more-icon"
                  width={24}
                  hanging={24}
                  icon={IconEnum.MoreHorizontal}
                />
              </button>
              <PopUpMenu
                backdropClassName={styles["popup"]}
                bodyClassName={styles["popup__body"]}
                contentWrapperClassNames={styles["popup__menu"]}
                nodeRef={popupRef}
                isOpen={isShown}
                setIsOpen={setIsShown}
              >
                <>
                  <button data-automation="clickButton" onClick={onHandleEdit}>
                    Edit comment
                  </button>
                  <button
                    data-automation="clickButton"
                    onClick={onHandleDelete}
                  >
                    Delete comment
                  </button>
                </>
              </PopUpMenu>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Comment;
