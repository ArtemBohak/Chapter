import {
  Avatar,
  CommentsButton,
  ConfirmationWindow,
  Icon,
  IconEnum,
  LikesButton,
  PopUpMenu,
  PostComments,
  PostDate,
  PostImage,
  PostText,
  PostTitle,
  UserNickName,
} from "@/src/components";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./UserPost.module.scss";
import { UserPostProps } from "../UserPost.type";
import { useAppSelector } from "@/src/redux";
import { EndpointsEnum, api } from "@/src/axios";
import {
  useErrorBoundary,
  useOutsideClick,
  useRefIntersection,
} from "@/src/hooks";
import { ElementsId } from "@/src/types";
import { PostEditing } from "@/src/components/Post/PostEditing";
import { intersectionHandlerCB } from "@/src/utils";
import { useProfileContext } from "@/src/context";
import { FilesService } from "@/src/services";

const UserPost: FC<UserPostProps> = ({ post, setPage, nodeRef }) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);
  const [showEditionWindow, setShowEditionWindow] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const [commentsList, setComentsList] = useState([]);
  const [commentsIsHide, setCommentsIsHide] = useState(true);
  const [usersWhoLikedPost, setUsersWhoLikedPost] = useState([]);
  const { page, fetchUserPosts, setUserPostsList } = useProfileContext();
  const setErrorBoundary = useErrorBoundary();

  const pageLoaderRef = useRef(null);

  useRefIntersection(intersectionHandlerCB(setPage), pageLoaderRef, {
    threshold: 1,
  });

  const fetchUsersWhoLikedPosts = async (id: string | number) => {
    const response = await api.get(
      `${EndpointsEnum.USERS_WHO_LIKED_POST}${id}`
    );
    setUsersWhoLikedPost(response.data.map((i: any) => i.userId));
  };
  useEffect(() => {
    fetchUsersWhoLikedPosts(post.postId);
  }, []);

  useEffect(() => {
    console.log(usersWhoLikedPost);
  }, [usersWhoLikedPost]);

  const ref = useRef(null);
  useOutsideClick(ref, setShowPopUp, ElementsId.POST_MORE_ICON);

  const deletePost = async (Id: string | number) => {
    setIsDeletingLoading(true);

    try {
      const response = await api.delete(`${EndpointsEnum.DELETE_POST}/${Id}`);

      if (post.imgUrl)
        new FilesService(undefined, setErrorBoundary).delete(post.imgUrl);

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setShowPopUp(false);
      setIsDeletingLoading(false);
      setShowConfirmationWindow(false);
      fetchUserPosts(1);
    }
  };

  const getComments = async (id: string | number) => {
    const response = await api.get(`${EndpointsEnum.GET_COMMENTS}${id}`);

    setComentsList(response.data);
  };

  useEffect(() => {
    getComments(post.postId);
  }, []);

  return (
    <div ref={nodeRef} className={styles["user-post"]}>
      <div
        ref={pageLoaderRef}
        data-value={pageLoaderRef && page ? page : ""}
        className="hide-element"
      />
      <div className="flex items-center justify-between w-full relative">
        <div className="flex gap-3 items-center">
          <Avatar avatarUrl={user.avatarUrl} />
          <UserNickName nickName={user.nickName} />
        </div>
        <button
          aria-label="Show popup button"
          className={styles["button-more"]}
          onClick={() => setShowPopUp(!showPopUp)}
        >
          <Icon
            id="more-icon"
            width={24}
            hanging={24}
            icon={IconEnum.MoreHorizontal}
          />
          <PopUpMenu
            backdropClassName={`${styles["popup"]}`}
            bodyClassName={styles["popup__body"]}
            isOpen={showPopUp}
            setIsOpen={setShowPopUp}
            nodeRef={ref}
          >
            <div className={styles["menu"]}>
              <button
                data-automation="clickButton"
                onClick={() => {
                  setShowPopUp(false);
                  setShowEditionWindow(true);
                }}
              >
                Edit post
              </button>
              <button
                data-automation="clickButton"
                aria-label="Delete post button"
                onClick={() => {
                  setShowPopUp(false);
                  setShowConfirmationWindow(true);
                }}
              >
                Delete post
              </button>
            </div>
          </PopUpMenu>
        </button>
      </div>
      <ConfirmationWindow
        text={"Do you want to delete this post?"}
        fetch={() => deletePost(post.postId)}
        isOpen={showConfirmationWindow}
        setIsOpen={setShowConfirmationWindow}
        isLoading={isDeletingLoading}
      />
      <PostEditing
        isOpen={showEditionWindow}
        setIsOpen={setShowEditionWindow}
        post={post}
        prevImgUrl={post.imgUrl}
        portal
      />
      <div className={styles["user-post__image"]}>
        <PostImage imgUrl={post.imgUrl} />
      </div>
      <div className="flex justify-between">
        <div className={styles["user-post__activity-icons"]}>
          <LikesButton
            id={post.postId}
            userIds={post.userIds}
            url={EndpointsEnum.POST_LIKE}
          />
          <CommentsButton
            id={post.postId}
            hiddenText
            textValue={""}
            postId={post.postId}
            commentsCount={commentsList.length}
          />
        </div>
        <PostDate createAt={post.updatedAt} />
      </div>
      <PostTitle title={post.title} />
      <PostText caption={post.caption} />
      <PostComments
        setPosts={setUserPostsList}
        postId={post.postId}
        commentsCount={post.comments.length}
        comments={post.comments}
        setCommentsIsHide={setCommentsIsHide}
        commentsIsHide={commentsIsHide}
      />
    </div>
  );
};

export default UserPost;
