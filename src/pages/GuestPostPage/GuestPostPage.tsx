import { FC } from "react";
import { useParams } from "react-router-dom";

import styles from "./GuestPostPage.module.scss";

const GuestPostPage: FC = () => {
  const { id } = useParams();
  id;
  return (
    <section className={styles["post"]}>
      <div className={styles["container"]}>POST</div>
    </section>
  );
};

export default GuestPostPage;
