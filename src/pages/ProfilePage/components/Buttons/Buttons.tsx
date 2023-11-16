import { UIbutton } from "@/src/components";
import { FC } from "react";
import styles from "./Buttons.module.scss";
import { ButtonsEnum } from "./Buttons.type";

interface ButtonsProps {
  currentView: string;
  changeView: (e: React.MouseEvent) => void;
}

const Buttons: FC<ButtonsProps> = ({ currentView, changeView }) => {
  return (
    <div className={styles["buttons-block"]}>
      <UIbutton
        id="posts"
        className={
          currentView === ButtonsEnum.posts
            ? styles["button-posts__active"]
            : styles["button-posts"]
        }
        fullWidth={false}
        onClick={changeView}
        size="medium"
        color="secondary"
        dataAutomation="postsButton"
      >
        Posts
      </UIbutton>
      <UIbutton
        id="liked"
        className={
          currentView === ButtonsEnum.liked
            ? styles["button-liked__active"]
            : styles["button-liked"]
        }
        fullWidth={false}
        onClick={changeView}
        size="medium"
        color="secondary"
        dataAutomation="likedButton"
      >
        Liked
      </UIbutton>
    </div>
  );
};

export default Buttons;
