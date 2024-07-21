import { FC } from "react";

import { getDate, formatDate } from "@/src/utils";
import { PostDateProps } from "./PostDate.type";
import styles from "./PostDate.module.scss";

const PostDate: FC<PostDateProps> = ({ createAt, creatingPost = false }) => (
  <p className={styles["date"]}>
    {creatingPost ? formatDate(createAt) : getDate(createAt)}
  </p>
);

export default PostDate;
