
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
import { useOutsideClick } from "@/src/hooks";
import { ElementsId } from "@/src/types";

import { usePostsContext } from "../context";
import { PostEditing } from "@/src/components/Post/PostEditing";


const UserPost: FC<UserPostProps> = ({ post }) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);
  const [showEditionWindow, setShowEditionWindow] = useState(false);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);
  const [commentsList, setComentsList] = useState([])
  const { fetchUserPosts } = usePostsContext()
  const [commentsIsHide, setCommentsIsHide] = useState(true);

  const [usersWhoLikedPost, setUsersWhoLikedPost] = useState([])




  const fetchUsersWhoLikedPosts = async (id: number) => {
    const response = await api.get(`${EndpointsEnum.USERS_WHO_LIKED_POST}${id}`);
    setUsersWhoLikedPost(response.data.map((i: any) => i.userId))

  };
  useEffect(() => {
    fetchUsersWhoLikedPosts(post.id);
  }, [])

  useEffect(() => {
    console.log(usersWhoLikedPost)
  }, [usersWhoLikedPost])


  const ref = useRef(null);
  useOutsideClick(ref, setShowPopUp, ElementsId.POST_MORE_ICON);

  const deletePost = async (Id: number) => {
    setIsDeletingLoading(true);
    try {
      const response = await api.delete(`${EndpointsEnum.DELETE_POST}${Id}`);
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
    const response = await api.get(`${EndpointsEnum.GET_COMMENTS}${id}`);

    setComentsList(response.data);
  };

  useEffect(() => {
    getComments(post.id);

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
              <button data-automation="clickButton" onClick={() => setShowEditionWindow(true)}>
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
      <PostEditing isOpen={showEditionWindow} setIsOpen={setShowEditionWindow} post={post} portal />
      <div className={styles["user-post__image"]}>
        <PostImage imgUrl={post.imgUrl} />
      </div>
      <div className="flex justify-between">
        <div className={styles["user-post__activity-icons"]}>
          <LikesButton id={post.id} userIds={usersWhoLikedPost} url={EndpointsEnum.POST_LIKE} />
          <CommentsButton
            id={post.id}
            hiddenText
            textValue={''}
            postId={post.id}
            commentsCount={commentsList.length} />
        </div>
        <PostDate createAt={post.updatedAt} />
      </div>
      <PostTitle title={post.title} />
      <PostText caption={post.caption} />
      <PostComments

        postId={post.id}
        commentsCount={commentsList.length}
        comments={commentsList}
        setCommentsIsHide={setCommentsIsHide}
        commentsIsHide={commentsIsHide}
      />

      {/* <PostDate date={post.createdAt}/> */}

      {/* setFeeds={setComentsList} */}
    </div>
  );
};

export default UserPost;
