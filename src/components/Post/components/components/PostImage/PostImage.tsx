import { FC } from "react";

import { PostImageProps } from "./PostImage.type";
import styles from "./PostImage.module.scss";

const PostImage: FC<PostImageProps> = ({ imageUrl }) => {
  if (imageUrl)
    return (
      <div className={styles["image"]}>
        <img src={imageUrl} alt="post image" />
      </div>
    );

  return null;
};

export default PostImage;
