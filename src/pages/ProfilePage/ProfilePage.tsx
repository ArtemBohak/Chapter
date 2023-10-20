import { FC } from "react";

import styles from "./ProfilePage.module.scss";
import Profile from "./components/Profile/Profile";
import Posts from "./components/Posts/PostsBlock";

const ProfilePage: FC = () => {
  return (
    <>
      <div className={styles["profile-conteiner"]}>
        <Profile />
        <Posts />
      </div>
    </>
  );
};

export default ProfilePage;
