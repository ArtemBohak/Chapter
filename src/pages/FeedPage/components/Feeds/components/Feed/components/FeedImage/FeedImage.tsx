import { FC } from "react";
import { Link } from "react-router-dom";

import { links } from "@/src/types";
import { FeedImageProps } from "./FeedImage.type";
import styles from "./FeedImage.module.scss";

const FeedImage: FC<FeedImageProps> = ({ image, id }) => (
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

export default FeedImage;
