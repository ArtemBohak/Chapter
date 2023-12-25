import { FC } from "react";

import { formatDate } from "@/src/utils";
import { PostDateProps } from "./PostDate.type";
import styles from "./PostDate.module.scss";

const PostDate: FC<PostDateProps> = ({ createAt }) => (
  <p className={styles["date"]}>{formatDate(createAt)}</p>
);

export default PostDate;
