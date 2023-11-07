import { FC } from "react";
import { Link } from "react-router-dom";

import { links } from "@/src/types";
import { PostImageProps } from "./PostImage.type";
import styles from "./PostImage.module.scss";

const PostImage: FC<PostImageProps> = ({ image, id, pageVariant }) =>
  pageVariant === "feed" ? (
    <Link to={links.FEED + `/${id}`}>
      <img
        src={image}
        alt="post image"
        width={845}
        height={385}
        className={styles["image__feed"]}
      />
    </Link>
  ) : (
    <img
      src={image}
      alt="post image"
      width={845}
      height={385}
      className={styles["post-image__post"]}
    />
  );

export default PostImage;
