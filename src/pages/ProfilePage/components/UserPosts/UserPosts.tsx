import { FC } from "react";
import styles from "./Posts.module.scss";
import { Post } from "@/src/components";

const UserPosts: FC = () => {
  return (
    <div className={styles["posts-wrapper"]}>
      {/* {[...new Array(5)].map((_, i) => (
        <Post
          pageVariant={"feed"}
          nodeRef={undefined}
          id={""}
          avatar={null}
          nickName={""}
          image={""}
          followList={[]}
          likesList={[]}
          totalLikes={0}
          totalComments={0}
          date={""}
          firstName={""}
          lastName={""}
          title={""}
          text={""}
        />
      ))} */}
    </div>
  );
};

export default UserPosts;
