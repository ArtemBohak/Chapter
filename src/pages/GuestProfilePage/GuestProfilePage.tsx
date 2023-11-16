import { FC } from "react";
import styles from "./GuestProfilePage.module.scss";
import GuestProfile from "./components/GuestProfile/GuestProfile";
import Posts from "../ProfilePage/components/UserPosts/UserPosts";
import { UIbutton } from "@/src/components";

const GuestProfilePage: FC = () => {
  return (
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
          <Posts />
        </div>
      </div>
    </section>
  );
};

export default GuestProfilePage;
