import { FC } from "react";

import { PostImageProps } from "./PostImage.type";
import styles from "./PostImage.module.scss";

const PostImage: FC<PostImageProps> = ({ image }) => {
  if (image)
    return (
      <img
        src={image}
        alt="post image"
        width={845}
        height={385}
        className={`${styles["image"]} ${styles["image__post"]}`}
      />
    );

  return null;
};

export default PostImage;
