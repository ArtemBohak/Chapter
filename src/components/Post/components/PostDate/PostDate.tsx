import { FC } from "react";

import { getDate } from "@/src/utils";
import { PostDateProps } from "./PostDate.type";
import styles from "./PostDate.module.scss";

const PostDate: FC<PostDateProps> = ({ createAt }) => (
  <p className={styles["date"]}>{getDate(createAt)}</p>
);

export default PostDate;
