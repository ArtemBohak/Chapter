import { FC, useEffect } from "react";
import styles from "./Posts.module.scss";
import { PostSkeleton } from "@/src/components";
import UserPost from "./UserPost/UserPost";
import { usePostsContext } from "./context";


const UserPosts: FC = () => {
  const { userPostsList, fetchUserPosts } = usePostsContext()



  useEffect(() => {
    fetchUserPosts();
  }, []);



  return (
    <div className={styles["posts-wrapper"]}>
      {userPostsList.length > 0 ? (
        userPostsList.map((post) => (
          <UserPost key={post.id} post={post} />
        ))
      ) : (
        <div className={styles["user-post__skeleton"]}>
          <PostSkeleton />
        </div>
      )}
    </div>
  );
};

export default UserPosts;
