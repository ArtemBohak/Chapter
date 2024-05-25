import { EndpointsEnum, api, followApi } from "@/src/axios";
import {
  Avatar,
  CommentsButton,
  LikesButton,
  PostComments,
  PostDate,
  PostImage,
  PostText,
  PostTitle,
  UIbutton,
  UserNickName,
} from "@/src/components";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Liked.module.scss";
import { LikedPostProps } from "../UserLikedPost.type";
import { usePostsContext } from "../../UserPosts/context";
import { updateUser, useAppSelector } from "@/src/redux";
import { useDispatch } from "react-redux";
import { useRefIntersection } from "@/src/hooks";
import { intersectionHandlerCB } from "@/src/utils";

const LikedPost: FC<LikedPostProps> = ({
  post,
  //   nodeRef,
  pageLoaderRef,
  pageValue,
  ...props
}) => {
  const [commentsIsHide, setCommentsIsHide] = useState(true);
  const [subsribedToPostAuthor, setSubsribedToPostAuthort] = useState(
    post.isSubscribeToAuthor
  );
  const { user } = useAppSelector((state) => state.userSlice);
  const { setUserLikedPostsList } = usePostsContext();
  const dispatch = useDispatch();

  const FollowUnfollow = async () => {
    try {
      await followApi(post.author.id);
      const response = await api.get(EndpointsEnum.PROFILE);
      dispatch(updateUser(response.data));
      setSubsribedToPostAuthort(!subsribedToPostAuthor);
    } catch (error) {
      console.log(error);
    }
  };

  useRefIntersection(intersectionHandlerCB(props.setPage), pageLoaderRef, {
    threshold: 1,
  });

  return (
    <div key={post.postId} className={styles["user-post"]}>
      <div
        ref={pageLoaderRef}
        data-value={pageLoaderRef && pageValue ? pageValue : ""}
        className="hide-element"
      />
      <div className="flex items-center justify-between gap-2 w-full">
        <Link
          className={styles["user-post__link"]}
          to={post.author.id != undefined ? `/${post.author.id}` : ""}
        >
          <Avatar avatarUrl={post.author.avatar} />
          <UserNickName nickName={post.author.nickName} />
        </Link>
        {post.author.id !== user.id && (
          <UIbutton
            variant={subsribedToPostAuthor ? "outlined" : "contained"}
            dataAutomation={"subscribe-button"}
            onClick={FollowUnfollow}
          >
            {subsribedToPostAuthor ? "unfollow" : "follow"}
          </UIbutton>
        )}
      </div>
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
            textValue={""}
            id={""}
            commentsCount={post.commentsCount}
            postId={post.postId}
          />
        </div>
        <PostDate createAt={post.createAt} />
      </div>
      <PostTitle title={post.title} />
      <PostText caption={post.caption} />
      <PostComments
        postAuthor={post.author.id}
        setPosts={setUserLikedPostsList}
        postId={post.postId}
        commentsCount={post.commentsCount}
        comments={post.comments}
        setCommentsIsHide={setCommentsIsHide}
        commentsIsHide={commentsIsHide}
      />
    </div>
  );
};

export default LikedPost;
