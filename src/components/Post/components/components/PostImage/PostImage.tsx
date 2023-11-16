import { FC } from "react";

import { PostImageProps } from "./PostImage.type";
import styles from "./PostImage.module.scss";

const PostImage: FC<PostImageProps> = ({ image }) => (
  <img
    src={image}
    alt="post image"
    width={845}
    height={385}
    className={`${styles["image"]} ${styles["image__post"]}`}
  />
);

export default PostImage;
