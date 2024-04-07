import { FC, useEffect } from "react";
import styles from "./Posts.module.scss";
import { PostSkeleton } from "@/src/components";
import UserPost from "./UserPost/UserPost";
import { useProfileContext } from "@/src/context";


const UserPosts: FC = () => {
  const { page, setPage, userPostsList, fetchUserPosts, isPostsLoad } = useProfileContext()

  useEffect(() => {
    fetchUserPosts(page);
    console.log("Page №", page)
  }, [page]);

  if (isPostsLoad && userPostsList.length === 0) {
    return (
      <ul className={styles["posts-wrapper"]}>
      </ul>
    );
  }
  return (
    <ul className={styles["posts-wrapper"]}>
      {isPostsLoad ? (
        userPostsList.map((post) => (
          <UserPost key={post.postId} post={post} setPage={setPage} />
        ))
      ) : (

        <PostSkeleton className={styles["user-post__skeleton"]} />

      )}

    </ul>
  );
};

export default UserPosts;
