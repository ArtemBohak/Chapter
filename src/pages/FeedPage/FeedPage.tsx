import { FC } from "react";

import styles from "./FeedPage.module.scss";

import FeedsList from "./components/FeedsList/FeedsList";

const FeedPage: FC = () => {
  return (
    <section>
      <div className={styles["feed"]}>
        <FeedsList />
      </div>
    </section>
  );
};

export default FeedPage;
