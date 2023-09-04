import { FC } from "react";
import { useAppSelector } from "@/src/redux/hooks";
import styles from "./WelcomePagePanel.module.scss";

import UIbutton from "@/src/components/Buttons/UIbutton/UIbutton";
import { RootState } from "@/src/redux/store";

const WelcomePagePanel: FC = () => {
  const userStore = useAppSelector((state: RootState) => state.userSlice.user);

  return (
    <div className={styles["panel-container"]}>
      <div className={styles["panel"]}>
        <div className={styles["panel-description"]}>
          <h2>Welcome to Chapter - {userStore.firstName}</h2>
          <h3>Read, discuss, make new friends!</h3>
        </div>
        <div className={styles["panel-buttons"]}>
          <UIbutton
            size="large"
            fullWidth
            dataAutomation="navigationButton"
            href={links.SIGN_UP}
          >
            Sign up
          </UIbutton>
          <UIbutton
            size="large"
            fullWidth
            dataAutomation="navigationButton"
            variant="outlined"
            href={links.LOG_IN}
          >
            Log in
          </UIbutton>
        </div>
      </div>
    </div>
  );
};

export default WelcomePagePanel;
