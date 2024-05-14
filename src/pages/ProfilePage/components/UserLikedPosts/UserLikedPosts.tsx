import { FC, createRef, useEffect, useState } from "react";
import styles from "./Liked.module.scss";
import { EndpointsEnum } from "@/src/axios";
import { Loader } from "@/src/components";
import { usePostsContext } from "../UserPosts/context";
import LikedPost from "./LikedPost/LikedPost";
import { useRefIntersection } from "@/src/hooks";
import { useProfileContext } from "@/src/context";
import { intersectionHandlerCB } from "@/src/utils";


const UserLikedPosts: FC = () => {
  const { userLikedPostsList, setUserLikedPostsList } = usePostsContext()
  const { userPostsApi, intersectionRef, isPostsLoad } = useProfileContext()
  const [page, setPage] = useState(1);
  const [isPostsLoaded, setIsPostsLoaded] = useState(false);


  useRefIntersection(intersectionHandlerCB(setPage), intersectionRef, {
    postsIsLoad: isPostsLoad,
    threshold: 1,
  });

  // const scrollHandler = () => {
  //   const scrollContainer = PostsListViewport.current;
  //   const nextPage = page + 1;

  //   console.log(scrollContainer);

  //   if (scrollContainer && !isPostsLoaded) {
  //     const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

  //     if (scrollHeight - (scrollTop + clientHeight) <= 20) {
  //       setIsPostsLoaded(true);
  //       setPage(nextPage);

  //       fetchUserLikedPosts(nextPage)
  //         .catch((error) => {
  //           console.log(error);
  //         })
  //         .finally(() => {
  //           setIsPostsLoaded(false);
  //         });
  //     }
  //   }
  // };


  useEffect(() => {
    userPostsApi(EndpointsEnum.LIKED_POSTS, setUserLikedPostsList, page, setIsPostsLoaded)
  }, [page]);

  if (isPostsLoaded && userLikedPostsList.length === 0) {
    return (
      <div className={styles["liked-wrapper"]}>
      </div>
    );
  }
  return (
    <div
      className={styles["liked-wrapper"]}
    >
      {(
        userLikedPostsList.map((post) => {
          const nodeRef = createRef<HTMLDivElement>();
          return <LikedPost
            key={post.postId}
            {...post}
            post={post}
            setPage={setPage}
            nodeRef={nodeRef} />
        }

        )
      )}
      <Loader
        isShown={!userLikedPostsList.length && isPostsLoad}
        wrapperClassNames={styles["loader"]}
        height={80}
        width={90}
      />
    </div>
  );
};

export default UserLikedPosts;
