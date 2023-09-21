import { FC } from "react";

import styles from "./FeedPage.module.scss";

import FeedsList from "./components/FeedsList/FeedsList";

const FeedPage: FC = () => {
  return (
    <section className={styles["feed"]}>
      <div className={styles["feed__container"]}>
        <FeedsList />
      </div>
    </section>
  );
};

export default FeedPage;
