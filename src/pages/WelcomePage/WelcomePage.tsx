import { FC } from "react";

import Logo from "@/src/components/SVGComponents/Logo";
import styles from "./WelcomePage.module.scss";

import WelcomePageImage from "./components/WelcomePageImage/WelcomePageImage";
import WelcomePagePanel from "./components/WelcomePagePanel/WelcomePagePanel";
import TestingForm from "./TestingForm";

const WelcomePage: FC = () => {
  return (
    <>
      <Logo className={styles.logo} />
      <div className={styles["welcome-page__container"]}>
        <WelcomePageImage />
        <WelcomePagePanel />
      </div>
      <TestingForm />
    </>
  );
};

export default WelcomePage;
