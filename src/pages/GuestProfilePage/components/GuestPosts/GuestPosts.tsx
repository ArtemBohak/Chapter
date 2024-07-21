import { FC, createRef } from "react";
import styles from "./GuestPosts.module.scss";
import { Loader } from "@/src/components";
import { useGuestContext } from "../../context";
import GuestPost from "./GuestPost/GuestPost";
import { useRefIntersection } from "@/src/hooks";
import { intersectionHandlerCB } from "@/src/utils";
import { useProfileContext } from "@/src/context";

const GuestPosts: FC = () => {
  const { guestPostsList, setPage, isGuestPostsLoaded } = useGuestContext();
  const { intersectionRef } = useProfileContext()


  useRefIntersection(intersectionHandlerCB(setPage), intersectionRef, {
    postsIsLoad: isGuestPostsLoaded,
    threshold: 1,
  });


  return (
    <ul className={styles["posts-wrapper"]}>
      {guestPostsList.length > 0 ? (
        guestPostsList.map((post) => {
          const nodeRef = createRef<HTMLDivElement>();
          return (
            <GuestPost key={post.postId}
              {...post}
              post={post}
              setPage={setPage}
              nodeRef={nodeRef} />
          )
        })
      ) : (
        <div className={styles["user-post__skeleton"]}>
          <Loader />
        </div>
      )}
    </ul>
  );
};

export default GuestPosts;
