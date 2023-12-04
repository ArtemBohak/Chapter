import { FC } from "react";

import { formatDate } from "@/src/utils";
import { PostDateProps } from "./PostDate.type";
import styles from "./PostDate.module.scss";

const PostDate: FC<PostDateProps> = ({ date }) => (
  <p className={styles["date"]}>{formatDate(date)}</p>
);

export default PostDate;
