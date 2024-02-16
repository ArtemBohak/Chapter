import { FC, useEffect, useState } from "react";
import styles from "./Liked.module.scss";
import { EndpointsEnum, api } from "@/src/axios";
import { Avatar, CommentsButton, LikesButton, PostComments, PostDate, PostImage, PostText, PostTitle, UserNickName } from "@/src/components";
import { LikedPostData } from "./UserLikedPost.type";
import { Link } from "react-router-dom";
// import { Like } from "@/src/components/Post/IconButtons/LikesButton/components/LikesModal/LikesModal.type";
import PostSkeleton from "../Profile/components/PostSkeleton/PostSkeleton";

const UserLikedPosts: FC = () => {
  const [userLikedPostsList, setUserLikedPostsList] = useState<LikedPostData[]>([])
  // const [usersWhoLikedPost, setUsersWhoLikedPost] = useState<Array<Like>>([])
  const [isPostsLoaded, setIsPostsLoaded] = useState(false)
  const fetchUserLikedPosts = async () => {
    try {
      const response = await api.get(EndpointsEnum.LIKED_POSTS)
      setUserLikedPostsList(response.data)
      console.log(response.data)
      setIsPostsLoaded(true)
    } catch (error) {
      console.log(error)
    }

  }
  const fetchUsersWhoLikedPosts = async () => {

    const response = await api.post(`/posts/users-who-liked-post/35`)
    // setUsersWhoLikedPost(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchUserLikedPosts()
    fetchUsersWhoLikedPosts()
  }, [])
  // const sortByCreatedDate = (a: LikedPostData, b: LikedPostData) => {
  //   new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
  // }
  if (isPostsLoaded && userLikedPostsList.length === 0) {
    return (
      <div className={styles["liked-wrapper"]}>
        <div className={'bg-white text-center m-auto my-[50px]'}>
          Hey! go to <Link to={"/feed"}>Feed</Link> and like some posts
        </div>
      </div>
    )
  }
  return (
    <div className={styles["liked-wrapper"]}>
      {isPostsLoaded ? userLikedPostsList.map((post) => (
        <div key={post.postId} className={styles["user-post"]}>
          <Link className={styles["user-post__link"]} to={post.author.authorId != undefined ? `/${post.author.authorId}` : ''}>
            <div className="flex items-center gap-2 w-full">
              <Avatar avatar={post.author.authorAvatar} />
              <UserNickName nickName={post.author.authorNickName} />
            </div>
          </Link>
          <div className={styles["user-post__image"]}><PostImage imgUrl={post.postimage} /></div>
          <div className="flex justify-between">
            <div className={styles["user-post__activity-icons"]}>
              <LikesButton id={post.postId} likesList={[]} totalLikes={post.likesCount} />
              <CommentsButton textValue={""} id={""} totalComments={post.commentCount} />
            </div>
            <PostDate date={post.createdDate} />
          </div>
          <PostTitle title={post.title} />
          <PostText caption={post.caption} />
          <PostComments id={post.postId} totalComments={post.commentCount} />

        </div>
      )

      ) : <div className={styles["user-post__skeleton"]}><PostSkeleton /></div>}
    </div>
  );
};

export default UserLikedPosts;
