import { FC } from "react";
import { useNavigate } from "react-router-dom";

import { links } from "@/src/types";
import styles from "./ErrorPage.module.scss";

import { ErrorLayout } from "@/src/layouts";

import { UIbutton } from "@/src/components";

const ErrorPage: FC = () => {
  const navigate = useNavigate();
  return (
    <ErrorLayout>
      <section className={styles["error"]}>
        <div className={styles["container"]}>
          <h1 className={`${styles["error_title"]} ${styles["title"]}`}>
            Oh no! Page not found
          </h1>
          <p className={`${styles["error__text"]} ${styles["text"]}`}>
            Sorry, we couldn`t find the page you are looking for.
          </p>
          <div className={styles["error__button"]}>
            <UIbutton
              onClick={() => navigate(links.HOME)}
              dataAutomation="navigationButton"
              className={`${styles["error__button"]} ${styles["button"]}`}
            >
              Go to home page
            </UIbutton>
          </div>
        </div>
      </section>
    </ErrorLayout>
  );
};

export default ErrorPage;
