import { FC } from "react";

import { IPostActivityProps } from "./PostActivity.type";
import styles from "./PostActivity.module.scss";

import LikesButton from "./components/LikesButton/LikesButton";
import CommentsButton from "./components/CommentsButton/CommentsButton";

const PostActivity: FC<IPostActivityProps> = (props) => {
  return (
    <div className={styles["feed-activity-wrapper"]}>
      <div className={styles["feed-activity-wrapper__icons"]}>
        <LikesButton {...props} />
        <CommentsButton {...props} />
      </div>
    </div>
  );
};

export default PostActivity;
