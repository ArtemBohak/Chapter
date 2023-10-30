import { FC } from "react";
import "@/src/extensions/string.extensions";

import styles from "./FeedPage.module.scss";

const FeedPage: FC = () => {
  console.log("fix".limit(1));
  return <section className={styles["feed"]}></section>;
};

export default FeedPage;
