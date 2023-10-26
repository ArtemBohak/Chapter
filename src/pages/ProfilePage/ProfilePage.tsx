import { FC, useState } from "react";

import styles from "./ProfilePage.module.scss";
import Profile from "./components/Profile/Profile";
import Posts from "./components/Posts/Posts";
import Buttons from "./components/Buttons/Buttons";
import { ButtonsEnum } from "./components/ProfilePage.type";
import Liked from "./components/Liked/Liked";

const ProfilePage: FC = () => {
  const [currentView, setCurrentView] = useState(ButtonsEnum.posts);

  const changeView = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(e);
    switch (e.currentTarget.id) {
      case "posts":
        setCurrentView(ButtonsEnum.posts);
        break;
      case "liked":
        setCurrentView(ButtonsEnum.liked);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={styles["profile-conteiner"]}>
        <Profile />
        <div className={styles["view-block-container"]}>
          <Buttons changeView={changeView} currentView={currentView} />
          <div className={styles["view-block-wrapper"]}>
            {currentView === ButtonsEnum.posts ? <Posts /> : <Liked />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
