import { FC } from "react";
import styles from "./GuestProfilePage.module.scss";
import GuestProfile from "./components/GuestProfile/GuestProfile";
import { UIbutton } from "@/src/components";
import GuestPosts from "./components/GuestPosts/GuestPosts";
import GuestProvider from "./context/GuestProvider";

const GuestProfilePage: FC = () => {
  return (
    <GuestProvider>
      <section className={styles["profile-wrapper"]}>
        <GuestProfile />
        <div className={styles["view-block-wrapper"]}>
          <div className={styles["view-block-container"]}>
            <div className={styles["buttons-block"]}>
              <UIbutton
                id="GuestPosts"
                className={styles["button-posts"]}
                fullWidth
                size="medium"
                color="secondary"
                dataAutomation="postsButton"
              >
                Posts
              </UIbutton>
            </div>
            <GuestPosts />
          </div>
        </div>
      </section>
    </GuestProvider>
  );
};

export default GuestProfilePage;
