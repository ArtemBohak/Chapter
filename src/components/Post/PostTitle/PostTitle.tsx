import { FC } from "react";

import { PostTitleProps } from "./PostTitle.type";
import styles from "./PostTitle.module.scss";

const PostTitle: FC<PostTitleProps> = ({ title }) => (
  <div className={styles["post-title"]}>
    <h4>{title}</h4>
  </div>
);

export default PostTitle;
