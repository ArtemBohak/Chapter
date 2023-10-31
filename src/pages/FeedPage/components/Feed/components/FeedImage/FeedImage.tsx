import { FC } from "react";

import { IFeedImageProps } from "./FeedImage.type";
import styles from "./FeedImage.module.scss";

import temp from "../../../../assets/feed-image.png";

const FeedImage: FC<IFeedImageProps> = ({ image = temp }) => (
  <img
    src={image}
    alt="feed image"
    width={845}
    height={385}
    className={styles["feed-image"]}
  />
);

export default FeedImage;
