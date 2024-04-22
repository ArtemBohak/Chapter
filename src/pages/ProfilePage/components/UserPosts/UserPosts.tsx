import { FC, createRef, useEffect } from "react";
import styles from "./Posts.module.scss";
import { PostSkeleton } from "@/src/components";
import UserPost from "./UserPost/UserPost";
import { useProfileContext } from "@/src/context";
import { useRefIntersection } from "@/src/hooks";
import { intersectionHandlerCB } from "@/src/utils";


const UserPosts: FC = () => {
  const { page, setPage, userPostsList, userPostsApi, isPostsLoad, intersectionRef } = useProfileContext()

  useRefIntersection(intersectionHandlerCB(setPage), intersectionRef, {
    postsIsLoad: isPostsLoad,
    threshold: 0.1,
  });

  useEffect(() => {
    userPostsApi()
    console.log("intersectionRef", intersectionRef)

  }, [page]);

  if (isPostsLoad && userPostsList.length === 0) {
    return (
      <ul className={styles["posts-wrapper"]}>
      </ul>
    );
  }
  return (
    <ul className={styles["posts-wrapper"]}>
      {(
        userPostsList.map((post) => {
          const nodeRef = createRef<HTMLDivElement>();
          return (<UserPost key={post.postId} post={post} setPage={setPage} nodeRef={nodeRef} />)
        }

        )
      )}

    </ul>
  );
};

export default UserPosts;
