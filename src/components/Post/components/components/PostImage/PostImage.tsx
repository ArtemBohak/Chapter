import { FC } from "react";

import { PostImageProps } from "./PostImage.type";
import styles from "./PostImage.module.scss";

const PostImage: FC<PostImageProps> = ({ image }) => {
  if (image)
    return (
      <div className={styles["image"]}>
        <img src={image} alt="post image" />
      </div>
    );

  return null;
};

export default PostImage;
