import { FC, useEffect, useRef, useState } from "react";
import styles from "./Liked.module.scss";
import { EndpointsEnum, api, followApi } from "@/src/axios";
import { Avatar, CommentsButton, LikesButton, PostComments, PostDate, PostImage, PostText, PostTitle, UIbutton, UserNickName } from "@/src/components";
import { LikedPostData } from "./UserLikedPost.type";
import { Link } from "react-router-dom";
// import { Like } from "@/src/components/Post/IconButtons/LikesButton/components/LikesModal/LikesModal.type";
import PostSkeleton from "../Profile/components/PostSkeleton/PostSkeleton";

const UserLikedPosts: FC = () => {
  const [userLikedPostsList, setUserLikedPostsList] = useState<LikedPostData[]>([])
  const [page, setPage] = useState(1)
  // const [usersWhoLikedPost, setUsersWhoLikedPost] = useState<Array<Like>>([])
  const [isPostsLoaded, setIsPostsLoaded] = useState(false)

  const fetchUserLikedPosts = async (page: number) => {
    try {
      const response = await api.get(`${EndpointsEnum.LIKED_POSTS}?page=${page}&limit=20`)
      setUserLikedPostsList(response.data)
      console.log(response.data)
      setIsPostsLoaded(true)
    } catch (error) {
      console.log(error)
    }

  }

  const PostsListViewport = useRef<HTMLDivElement | null>(null)

  const scrollHandler = () => {
    const scrollContainer = PostsListViewport.current;
    const nextPage = page + 1;

    console.log(scrollContainer)

    if (scrollContainer && !isPostsLoaded) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      if (scrollHeight - (scrollTop + clientHeight) <= 20) {

        setIsPostsLoaded(true)
        setPage(nextPage)

        fetchUserLikedPosts(nextPage).catch((error) => {
          console.log(error)
        }).finally(() => {
          setIsPostsLoaded(false);
        })
      }
    }
  };
  const fetchUsersWhoLikedPosts = async () => {

    const response = await api.post(`/posts/users-who-liked-post/35`)
    // setUsersWhoLikedPost(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    fetchUserLikedPosts(1)
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
    <div ref={PostsListViewport} onScroll={scrollHandler} className={styles["liked-wrapper"]}>
      {isPostsLoaded ? userLikedPostsList.map((post) => (
        <div key={post.postId} className={styles["user-post"]}>
          <div className="flex items-center justify-between gap-2 w-full">
            <Link className={styles["user-post__link"]} to={post.author.id != undefined ? `/${post.author.id}` : ''}>
              <Avatar avatar={post.author.avatar} />
              <UserNickName nickName={post.author.nickName} />
            </Link>
            <UIbutton
              variant={post.isSubscribeToAuthor ? "outlined" : "contained"}
              dataAutomation={"subscribe-button"} onClick={() => followApi(post.author.id)}>
              {post.isSubscribeToAuthor ? "unfollow" : "follow"}
            </UIbutton>
          </div>
          <div className={styles["user-post__image"]}><PostImage imgUrl={post.imgUrl} /></div>
          <div className="flex justify-between">
            <div className={styles["user-post__activity-icons"]}>
              <LikesButton id={post.postId} likesList={[]} totalLikes={post.likesCount} />
              <CommentsButton textValue={""} id={""} totalComments={post.commentsCount} />
            </div>
            <PostDate date={post.createAt} />
          </div>
          <PostTitle title={post.title} />
          <PostText caption={post.caption} />
          <PostComments id={post.postId} totalComments={post.commentsCount} />

        </div>
      )

      ) : <div className={styles["user-post__skeleton"]}><PostSkeleton /></div>}
    </div>
  );
};

export default UserLikedPosts;
