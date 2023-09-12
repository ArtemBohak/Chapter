import { FC } from "react";

import styles from "./WelcomePageImage.module.scss";
import girlImage from "src/assets/WEBP/welcome-page-girl.webp";

const WelcomePageImage: FC = () => {
  return (
    <div className={styles["image-container"]}>
      <div className={styles["image__background"]} />
      <div className={styles["image"]}>
        <img src={girlImage} alt="chapter-girl" />
      </div>
    </div>
  );
};

export default WelcomePageImage;
