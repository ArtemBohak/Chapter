import { FC } from "react";

import styles from "./WelcomePage.module.scss";

import WelcomePageImage from "./components/WelcomePageImage/WelcomePageImage";
import WelcomePagePanel from "./components/WelcomePagePanel/WelcomePagePanel";

const WelcomePage: FC = () => {
  return (
    <>
      <div className={styles["welcome-page__container"]}>
        <WelcomePageImage />
        <WelcomePagePanel />
      </div>
    </>
  );
};

export default WelcomePage;
