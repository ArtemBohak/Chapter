import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { UIbutton } from "@/src/components";
import styles from "./ErrorPanel.module.scss";

const ErrorPanel: FC = () => {
  const navigate = useNavigate();
  return (
    <section className={styles["error-content"]}>
      <div className={styles["error-content__container"]}>
        <p className={styles["error-content__top-text"]}>
          Oh no! Page not found
        </p>
        <p className={styles["error-content__bottom-text"]}>
          Sorry, we couldn`t find the page you are looking for.
        </p>
      </div>
      <UIbutton
        onClick={() => navigate("/")}
        dataAutomation="clickButton"
        className={styles["error-content__button"]}
      >
        Go to home page
      </UIbutton>
    </section>
  );
};

export default ErrorPanel;
