import { FC } from "react";

import { FeedActivityProps } from "./FeedActivity.type";
import styles from "./FeedActivity.module.scss";

import LikesButton from "../../../IconButtons/LikesButton/LikesButton";
import CommentsButton from "../../../IconButtons/CommentsButton/CommentsButton";
import FeedDate from "../../../FeedDate/FeedDate";

const FeedActivity: FC<FeedActivityProps> = (props) => {
  return (
    <div className={styles["feed-activity-wrapper"]}>
      <div className={styles["feed-activity-wrapper__icons"]}>
        <LikesButton {...props} />
        <CommentsButton {...props} />
      </div>
      <FeedDate {...props} />
    </div>
  );
};

export default FeedActivity;
