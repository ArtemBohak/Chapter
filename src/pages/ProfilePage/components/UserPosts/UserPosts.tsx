import { FC, useEffect } from "react";
import styles from "./Posts.module.scss";
import { PostSkeleton } from "@/src/components";
import UserPost from "./UserPost/UserPost";
import { useProfileContext } from "@/src/context";


const UserPosts: FC = () => {
  const { page, setPage, userPostsList, fetchUserPosts } = useProfileContext()



  useEffect(() => {
    fetchUserPosts(page);
    console.log("Page №", page)
  }, [page]);





  return (
    <ul className={styles["posts-wrapper"]}>
      {userPostsList.length > 0 ? (
        userPostsList.map((post) => (
          <UserPost key={post.postId} post={post} setPage={setPage} />
        ))
      ) : (
        <li className={styles["user-post__skeleton"]}>
          <PostSkeleton />
        </li>
      )}
    </ul>
  );
};

export default UserPosts;
