import { FC, useEffect, useState } from "react";
import styles from "./Posts.module.scss";
import { EndpointsEnum, api } from "@/src/axios";
import { PostData } from "./UserPost.type";
import { PostSkeleton } from "@/src/components";
import UserPost from "./UserPost/UserPost";

const UserPosts: FC = () => {
  const [userPostsList, setUserPostsList] = useState<PostData[]>([]);

  const fetchUserPosts = async () => {
    const response = await api.get(EndpointsEnum.POSTS_BY_AUTHOR);
    setUserPostsList(response.data);
  };

  useEffect(() => {
    if (userPostsList.length < 1) {
      fetchUserPosts();
    }
  }, []);

  return (
    <div className={styles["posts-wrapper"]}>
      {userPostsList.length > 0 ? (
        userPostsList.map((post) => (
          <UserPost key={post.id} post={post} fetchUserPosts={fetchUserPosts} />
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
