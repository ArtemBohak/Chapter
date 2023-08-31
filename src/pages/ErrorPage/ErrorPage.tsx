import { FC } from "react";

import image from "@/src/assets/WEBP/page-404.webp";
import styles from "./ErrorPage.module.scss";

import { ErrorLayout } from "./components";
import { UIbutton } from "@/src/components";

const ErrorPage: FC = () => {
  return (
    <ErrorLayout>
      <section className={styles["block-error"]}>
        <div className={styles["block-error__container"]}>
          <div className={styles["block-error__thumb"]}>
            <img
              width="974"
              height="649"
              alt="error-404"
              src={image}
              className={styles["block-error__image"]}
            />
          </div>
          <div className={styles["block-error__content"]}>
            <div className={styles["block-error__wrapper"]}>
              <h1 className={styles["block-error__heading"]}>
                Oh no! Page not found
              </h1>
              <p className={styles["block-error__text"]}>
                Sorry, we couldn`t find the page you are looking for.
              </p>
            </div>
            <UIbutton
              href="/"
              variant="contained"
              dataAutomation="navigationButton"
              className={`${styles["block-error__button"]} ${styles["error__btn"]}`}
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
