import React, { FC } from "react";

import styles from "./WelcomePageImage.module.css";
import girlImage from "src/assets/WEBP/welcome-page-girl.webp";

const WelcomePageImage: FC = () => {
  return (
    <div className={styles["image-container"]}>
      <div className={styles["image-background"]} />
      <img
        className={styles["image"]}
        src={girlImage}
        alt="chapter-girl.webp"
      />
    </div>
  );
};

export default WelcomePageImage;
