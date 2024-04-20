import { FC } from "react";
import styles from "./MessagesPage.module.scss";
import { DashBoard } from "./components";

const MessagesPage: FC = () => {
  return (
    <section className={styles["messages"]}>
      <div className={styles["container"]}>
        <DashBoard />
      </div>
    </section>
  );
};

export default MessagesPage;
