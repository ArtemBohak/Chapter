import { FC } from "react";
import "@/src/extensions/string.extensions";

import styles from "./FeedPage.module.scss";

const FeedPage: FC = () => {
  return (
    <section className={styles["feed"]}>
      <div className={styles["feed__container"]}></div>
    </section>
  );
};

export default FeedPage;
