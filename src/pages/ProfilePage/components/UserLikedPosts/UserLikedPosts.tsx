import { FC, useEffect, useRef, useState } from "react";
import styles from "./Liked.module.scss";
import { EndpointsEnum, api } from "@/src/axios";
import { Link } from "react-router-dom";
import { PostSkeleton } from "@/src/components";
import { usePostsContext } from "../UserPosts/context";
import LikedPost from "./LikedPost/LikedPost";
import { links } from "@/src/types";
import { useErrorBoundary } from "@/src/hooks";
import { AxiosError } from "axios";


const UserLikedPosts: FC = () => {
  const { userLikedPostsList, setUserLikedPostsList } = usePostsContext()
  const [page, setPage] = useState(1);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);
  const setErrorBoundary = useErrorBoundary()

  const fetchUserLikedPosts = async (page: number) => {
    try {
      const response = await api.get(
        `${EndpointsEnum.LIKED_POSTS}?page=${page}&limit=50`
      );
      setUserLikedPostsList(response.data);
      setIsPostsLoaded(true);
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorBoundary(error);

      }
    }

  };

  const PostsListViewport = useRef<HTMLDivElement | null>(null);

  const scrollHandler = () => {
    const scrollContainer = PostsListViewport.current;
    const nextPage = page + 1;

    console.log(scrollContainer);

    if (scrollContainer && !isPostsLoaded) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

      if (scrollHeight - (scrollTop + clientHeight) <= 20) {
        setIsPostsLoaded(true);
        setPage(nextPage);

        fetchUserLikedPosts(nextPage)
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setIsPostsLoaded(false);
          });
      }
    }
  };


  useEffect(() => {
    fetchUserLikedPosts(1);
  }, []);
  // const sortByCreatedDate = (a: LikedPostData, b: LikedPostData) => {
  //   new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
  // }
  if (isPostsLoaded && userLikedPostsList.length === 0) {
    return (
      <div className={styles["liked-wrapper"]}>
        <div className={"bg-white text-center m-auto my-[50px]"}>
          Hey! go to <Link to={links.FEED}>Feed</Link> and like some posts
        </div>
      </div>
    );
  }
  return (
    <div
      ref={PostsListViewport}
      onScroll={scrollHandler}
      className={styles["liked-wrapper"]}
    >
      {isPostsLoaded ? (
        userLikedPostsList.map((post) => (
          <LikedPost key={post.postId} post={post} />
        ))
      ) : (
        <div className={styles["user-post__skeleton"]}>
          <PostSkeleton />
        </div>
      )}
    </div>
  );
};

export default UserLikedPosts;
