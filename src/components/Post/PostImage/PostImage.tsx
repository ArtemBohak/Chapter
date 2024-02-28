import { FC } from "react";

import { PostImageProps } from "./PostImage.type";
import styles from "./PostImage.module.scss";

const PostImage: FC<PostImageProps> = ({ imgUrl }) => {
  if (imgUrl)
    return (
      <div className={styles["image"]}>
        <img src={imgUrl} alt="post image" loading="lazy" />
      </div>
    );

  return null;
};

export default PostImage;
