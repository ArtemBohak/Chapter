import { FC } from "react";
import { Link } from "react-router-dom";

import { links } from "@/src/types";
import { PostImageProps } from "./PostImage.type";
import styles from "./PostImage.module.scss";

const PostImage: FC<PostImageProps> = ({ image, id }) => (
  <Link to={links.FEED + `/${id}`}>
    <img
      src={image}
      alt="feed image"
      width={845}
      height={385}
      className={styles["feed-image"]}
    />
  </Link>
);

export default PostImage;