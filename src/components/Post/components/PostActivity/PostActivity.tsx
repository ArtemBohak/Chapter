import { FC } from "react";

import { PostActivityProps } from "./PostActivity.type";
import styles from "./PostActivity.module.scss";

import { PostDate, PostFullName } from "../";
import { LikesButton, CommentsButton } from "..";

const PostActivity: FC<PostActivityProps> = (props) => {
  return (
    <div className={styles["post-activity-wrapper"]}>
      <div className={styles["post-activity-wrapper__icons"]}>
        <LikesButton {...props} hiddenText />
        <CommentsButton {...props} hiddenText />
      </div>
      <div className={styles["post-activity-wrapper__text"]}>
        <PostFullName {...props} />
        <PostDate {...props} />
      </div>
    </div>
  );
};

export default PostActivity;
