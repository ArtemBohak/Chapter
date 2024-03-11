import { FC } from "react";
import styles from "./GuestPostPage.module.scss";

const GuestPostPage: FC = () => {
  return (
    <section className={styles["post"]}>
      <div className={styles["container"]}>POST</div>
    </section>
  );
};

export default GuestPostPage;
