import { FC, useEffect, useRef, useState } from "react";

import { FilesService } from "@/src/services";

import { UserPostProps } from "../UserPost.type";
import { useAppSelector } from "@/src/redux";
import { EndpointsEnum, api } from "@/src/axios";
import { useErrorBoundary, useOutsideClick } from "@/src/hooks";
import { ElementsId } from "@/src/types";
import styles from "./UserPost.module.scss";

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

const UserPost: FC<UserPostProps> = ({ post, fetchUserPosts }) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const [commentsList, setComentsList] = useState([]);

  const ref = useRef(null);
  const setErrorBoundary = useErrorBoundary();
  useOutsideClick(ref, setShowPopUp, ElementsId.POST_MORE_ICON);

  const deletePost = async (Id: number) => {
    setIsDeletingLoading(true);
    try {
      const response = await api.delete(`${EndpointsEnum.DELETE_POST}/${Id}`);
      await new FilesService(
        undefined,
        undefined,
        undefined,
        setErrorBoundary
      ).delete(post.imgUrl);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setShowPopUp(false);
      setIsDeletingLoading(false);
      setShowConfirmationWindow(false);
      fetchUserPosts();
    }
  };

  const getComments = async (id: number) => {
    const response = await api.get(`/comments/comments/${id}`);

    setComentsList(response.data.comments);
  };

  useEffect(() => {
    getComments(post.id);
    console.log(commentsList);
  }, []);

  return (
    <div className={styles["user-post"]}>
      <div className="flex items-center justify-between w-full relative">
        <div className="flex gap-3 items-center">
          <Avatar avatarUrl={user.avatarUrl} />
          <UserNickName nickName={user.nickName} />
        </div>
        <button
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
              <button data-automation="clickButton" onClick={() => {}}>
                Edit post
              </button>
              <button
                data-automation="clickButton"
                onClick={() => setShowConfirmationWindow(true)}
              >
                Delete post
              </button>
            </div>
          </PopUpMenu>
        </button>
      </div>
      <ConfirmationWindow
        text={"Do you want to delete this post?"}
        fetch={() => deletePost(post.id)}
        isOpen={showConfirmationWindow}
        setIsOpen={setShowConfirmationWindow}
        isLoading={isDeletingLoading}
      />
      <div className={styles["user-post__image"]}>
        <PostImage imgUrl={post.imgUrl} />
      </div>
      <div className="flex justify-between">
        <div className={styles["user-post__activity-icons"]}>
          <LikesButton id={post.id} userIds={[]} totalLikes={0} url="" />
          <CommentsButton
            textValue={""}
            id={""}
            commentsCount={0}
            postId={""}
          />
        </div>
        <PostDate createAt={post.updatedAt} />
      </div>
      <PostTitle title={post.title} />
      <PostText caption={post.caption} />
      <PostComments postId={post.id} commentsCount={0} comments={[]} />

      {/* <PostDate date={post.createdAt}/> */}
    </div>
  );
};

export default UserPost;
