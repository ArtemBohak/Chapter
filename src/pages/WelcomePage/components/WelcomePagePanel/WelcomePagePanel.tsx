import { FC } from "react";

import { links } from "@/src/types";
import styles from "./WelcomePagePanel.module.scss";

import UIbutton from "@/src/components/Buttons/UIbutton/UIbutton";

const WelcomePagePanel: FC = () => {
  return (
    <div className={styles["panel-container"]}>
      <div className={styles["panel"]}>
        <div className={styles["panel-description"]}>
          <h2>Welcome to Chapter</h2>
          <h3>Read, discuss, make new friends!</h3>
        </div>
        <div className={styles["panel-buttons"]}>
          <UIbutton
            size="large"
            fullWidth
            dataAutomation="navigationButton"
            href={links.SIGN_UP}
            aria-label="Sign up nav link"
          >
            Sign up
          </UIbutton>
          <UIbutton
            size="large"
            fullWidth
            dataAutomation="navigationButton"
            variant="outlined"
            href={links.LOG_IN}
            aria-label="Log in nav link"
          >
            Log in
          </UIbutton>
        </div>
      </div>
    </div>
  );
};

export default WelcomePagePanel;
