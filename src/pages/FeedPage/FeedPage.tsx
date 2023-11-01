import { FC } from "react";
import "@/src/extensions/string.extensions";

import styles from "./FeedPage.module.scss";

import Feeds from "./components/Feeds/Feeds";
import { FeedProvider } from "./context";

const FeedPage: FC = () => {
  return (
    <FeedProvider>
      <section className={styles["feed"]}>
        <div className={styles["feed__container"]}>
          <Feeds />
        </div>
      </section>
    </FeedProvider>
  );
};

export default FeedPage;
