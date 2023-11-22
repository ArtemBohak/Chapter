import { FC } from "react";
import { PostPreviewProps } from "./PostPreview.type";
import styles from "./PostPreview.module.scss";

const PostPreview: FC<PostPreviewProps> = () => {
  return <div className={styles["preview"]}></div>;
};

export default PostPreview;
