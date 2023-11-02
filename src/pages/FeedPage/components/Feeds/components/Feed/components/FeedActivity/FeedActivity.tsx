import { FC } from "react";

import { FeedActivityProps } from "./FeedActivity.type";
import styles from "./FeedActivity.module.scss";

import { FeedDate } from "./components";
import { LikesButton, CommentsButton } from "../";

const FeedActivity: FC<FeedActivityProps> = (props) => {
  return (
    <div className={styles["feed-activity-wrapper"]}>
      <div className={styles["feed-activity-wrapper__icons"]}>
        <LikesButton {...props} hiddenText />
        <CommentsButton {...props} hiddenText />
      </div>
      <FeedDate {...props} />
    </div>
  );
};

export default FeedActivity;
