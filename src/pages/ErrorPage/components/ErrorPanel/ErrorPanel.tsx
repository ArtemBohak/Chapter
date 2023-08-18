import { FC } from "react";

import styles from "./ErrorPanel.module.scss";

const ErrorPanel: FC = () => {
  return (
    <div className={styles["error-content__wrapper"]}>
      <p className={styles["error-content__top-text"]}>Oh no! Page not found</p>
      <p className={styles["error-content__bottom-text"]}>
        Sorry, we couldn`t find the page you are looking for.
      </p>
    </div>
  );
};

export default ErrorPanel;
