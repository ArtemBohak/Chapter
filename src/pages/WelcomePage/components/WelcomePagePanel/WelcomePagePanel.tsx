import React, { FC } from "react";

import styles from "./WelcomePagePanel.module.css";

import UIbutton from "@/src/components/Buttons/UIbutton/UIbutton";

const WelcomePagePanel: FC = () => {
  return (
    <div className={styles["panel-container"]}>
      <div className={styles["panel-description"]}>
        <h2>Welcome to Chapter</h2>
        <h2>Welcome to “Chapter”!</h2>
        <h3>Read, discuss, make new friends!</h3>
      </div>
      <div className={styles["panel-buttons"]}>
        <UIbutton variant="orange-contained" title="Sign up" size="xl" />
        <UIbutton variant="orange-outlined" title="Log in" size="xl" />
      </div>
    </div>
  );
};

export default WelcomePagePanel;
