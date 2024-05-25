import { FC, useState } from "react";
import styles from "../GuestPosts.module.scss";
import {
  Avatar,
  CommentsButton,
  LikesButton,
  PostComments,
  PostDate,
  PostImage,
  PostText,
  PostTitle,
  UserNickName,
} from "@/src/components";
import { useGuestContext } from "../../../context";
import { GuestPostProps } from "./GuestPost.type";
import { EndpointsEnum } from "@/src/axios";
import { useParams } from "react-router-dom";
import GuestFollowButton from "../../GuestFollowButton/GuestFollowButton";
import { useRefIntersection } from "@/src/hooks";
import { intersectionHandlerCB } from "@/src/utils";

const GuestPost: FC<GuestPostProps> = ({
  post,
  pageLoaderRef,
  pageValue,
  ...props
}) => {
  const { enemyData, setGuestPostsList } = useGuestContext();
  // const [commentsList, setComentsList] = useState([])
  const [commentsIsHide, setCommentsIsHide] = useState(true);
  const { Id } = useParams();

  useRefIntersection(intersectionHandlerCB(props.setPage), pageLoaderRef, {
    threshold: 1,
  });

  // const getComments = async (id: number | string) => {
  //     const response = await api.get(`/comments/comments/${id}`);
  //     setComentsList(response.data);
  //     console.log(response.data)
  // };

  // useEffect(() => {
  //     getComments(post.postId);
  // }, []);

  const commentsCount = post.commentsCount > 0 ? post.commentsCount : "";
  return (
    <li className={styles["user-post"]} key={post.postId}>
      <div
        ref={pageLoaderRef}
        data-value={pageLoaderRef && pageValue ? pageValue : ""}
        className="hide-element"
      />
      <div className="flex items-center justify-between w-full relative">
        <div className="flex gap-3 items-center">
          <Avatar avatarUrl={enemyData?.avatarUrl || null} />
          <UserNickName nickName={enemyData?.nickName || ""} />
        </div>
        <GuestFollowButton
          id={Id}
          isSubscribeToAuthor={enemyData && enemyData.isSubscribed}
        />
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
            postId={post.postId}
            commentsCount={post.commentsCount}
          />
        </div>
        <PostDate createAt={post.updatedAt} />
      </div>
      <PostTitle title={post.title} />
      <PostText caption={post.caption} />
      <PostComments
        setPosts={setGuestPostsList}
        postId={post.postId}
        commentsCount={+commentsCount}
        comments={post.comments}
        setCommentsIsHide={setCommentsIsHide}
        commentsIsHide={commentsIsHide}
        postAuthor={post.author.id}
      />
      {/* <PostDate date={post.createdAt}/> */}
    </li>
  );
};

export default GuestPost;
