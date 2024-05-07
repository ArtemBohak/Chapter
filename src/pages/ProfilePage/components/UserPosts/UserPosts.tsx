import { FC, createRef, useEffect, useState } from "react";
import styles from "./Posts.module.scss";
import { Loader } from "@/src/components";
import UserPost from "./UserPost/UserPost";
import { useProfileContext } from "@/src/context";
import { useRefIntersection } from "@/src/hooks";
import { intersectionHandlerCB } from "@/src/utils";
import { EndpointsEnum } from "@/src/axios";


const UserPosts: FC = () => {

  const { page, setPage, userPostsList, userPostsApi, isPostsLoad, intersectionRef, setUserPostsList } = useProfileContext()
  const [isPostsLoaded, setIsPostsLoaded] = useState(false)

  useRefIntersection(intersectionHandlerCB(setPage), intersectionRef, {
    postsIsLoad: isPostsLoad,
    threshold: 1,
  });

  useEffect(() => {
    userPostsApi(EndpointsEnum.POSTS_BY_AUTHOR, setUserPostsList, page, setIsPostsLoaded)
  }, [page]);

  if (isPostsLoaded && userPostsList.length === 0) {
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
          return (
            <li key={post.postId}>
              <UserPost
                {...post}
                post={post}
                setPage={setPage}
                nodeRef={nodeRef} />
            </li>
          )
        })
      )}
      <Loader
        isShown={isPostsLoad}
        wrapperClassNames={styles["loader"]}
        height={80}
        width={90}
      />
    </ul>
  );
};

export default UserPosts;
