import { FC } from "react";
import { useNavigate } from "react-router-dom";

import image from "@/src/assets/WEBP/page-404.webp";
import styles from "./ErrorPage.module.scss";

import { ErrorLayout } from "./components";
import { UIbutton } from "@/src/components";

const ErrorPage: FC = () => {
  const navigate = useNavigate();
  return (
    <ErrorLayout>
      <section className={styles["block-error"]}>
        <div className={styles["block-error__container"]}>
          <img src={image} alt="error-404" width="974" height="649" />
          <div className={styles["block-error__content"]}>
            <div className={styles["block-error__wrapper"]}>
              <h1 className={styles["block-error__heading"]}>
                Oh no! Page not found
              </h1>
              <p className={styles["block-error__text"]}>
                Sorry, we couldn`t find the page you are looking for.
              </p>
              <UIbutton
                onClick={() => navigate("/")}
                dataAutomation="navigationButton"
                className={styles["block-error__button"]}
              >
                Go to home page
              </UIbutton>
            </div>
          </div>
        </div>
      </section>
    </ErrorLayout>
  );
};

export default ErrorPage;
