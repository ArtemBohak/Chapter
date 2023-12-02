import { FC } from "react";
import { PostPreviewProps } from "./PostPreview.type";
import styles from "./PostPreview.module.scss";
import { PreviewComponent } from "@/src/components";

const PostPreview: FC<PostPreviewProps> = (props) => {
  return (
    <div className={styles["preview"]}>
      <PreviewComponent {...props} />
    </div>
  );
};

export default PostPreview;
