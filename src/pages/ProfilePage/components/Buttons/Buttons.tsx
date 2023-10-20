import { UIbutton } from "@/src/components";
import { FC } from "react";
import styles from "./Buttons.module.scss";

const Buttons: FC = () => {
  const handleButtonClick = () => {};
  return (
    <div>
      <UIbutton
        className={styles["button-posts"]}
        fullWidth={false}
        onClick={handleButtonClick}
        color="secondary"
        dataAutomation="posts"
      >
        Posts
      </UIbutton>
      <UIbutton
        id=""
        className={styles["button-liked"]}
        fullWidth={false}
        onClick={handleButtonClick}
        color="secondary"
        dataAutomation="posts"
      >
        Liked
      </UIbutton>
    </div>
  );
};

export default Buttons;
