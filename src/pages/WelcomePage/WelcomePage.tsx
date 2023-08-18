import { FC } from "react";

import Logo from "@/src/components/SVGComponents/Logo";
import styles from "./WelcomePage.module.scss";

import WelcomePageImage from "./components/WelcomePageImage/WelcomePageImage";
import WelcomePagePanel from "./components/WelcomePagePanel/WelcomePagePanel";

const WelcomePage: FC = () => {
  return (
    <>
      <Logo className={styles.logo} />
      <div className={styles["welcome-page__container"]}>
        <WelcomePageImage />
        <WelcomePagePanel />
      </div>
    </>
  );
};

export default WelcomePage;
