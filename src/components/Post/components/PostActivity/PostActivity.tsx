import { FC } from "react";

import { PostActivityProps } from "./PostActivity.type";
import styles from "./PostActivity.module.scss";

import { PostDate } from "./components";
import { LikesButton, CommentsButton } from "..";

const PostActivity: FC<PostActivityProps> = (props) => {
  return (
    <div className={styles["feed-activity-wrapper"]}>
      <div className={styles["feed-activity-wrapper__icons"]}>
        <LikesButton {...props} hiddenText />
        <CommentsButton {...props} hiddenText />
      </div>
      <PostDate {...props} />
    </div>
  );
};

export default PostActivity;
