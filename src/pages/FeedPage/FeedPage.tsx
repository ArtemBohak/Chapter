import { FC } from "react";
import "@/src/extensions/string.extensions";

import styles from "./FeedPage.module.scss";

import Feeds from "./components/Feeds/Feeds";

const FeedPage: FC = () => {
  return (
    <section className={styles["feed"]}>
      <div className={styles["feed__container"]}>
        <Feeds />
      </div>
    </section>
  );
};

export default FeedPage;
