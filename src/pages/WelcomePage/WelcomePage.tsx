import { FC } from "react";
import styles from "./WelcomePage.module.scss";

import WelcomePageImage from "./components/WelcomePageImage/WelcomePageImage";
import WelcomePagePanel from "./components/WelcomePagePanel/WelcomePagePanel";

const WelcomePage: FC = () => {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["welcome-page-container"]}>
        <WelcomePageImage />
        <WelcomePagePanel />
      </div>
    </div>
  );
};

export default WelcomePage;
