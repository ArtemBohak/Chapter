import { FC } from "react";

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
            href="/register"
          >
            Sign up
          </UIbutton>
          <UIbutton
            size="large"
            fullWidth
            dataAutomation="navigationButton"
            variant="outlined"
            href="/login"
          >
            Log in
          </UIbutton>
        </div>
      </div>
    </div>
  );
};

export default WelcomePagePanel;
