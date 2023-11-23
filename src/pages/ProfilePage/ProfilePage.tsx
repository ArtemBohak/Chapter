import { FC, useState } from "react";
import styles from "./ProfilePage.module.scss";
import Profile from "./components/Profile/Profile";
import Buttons from "./components/Buttons/Buttons";
import { ButtonsEnum } from "./components/Buttons/Buttons.type";
import Posts from "./components/UserPosts/UserPosts";
import Liked from "./components/UserLikedPosts/UserLikedPosts";
import { PostCreation } from "@/src/components";

const ProfilePage: FC = () => {
  const [currentView, setCurrentView] = useState(ButtonsEnum.posts);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const changeView = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <section className={styles["profile-wrapper"]}>
      <Profile setIsOpen={setModalIsOpen} />
      <div className={styles["view-block-wrapper"]}>
        <div className={styles["view-block-container"]}>
          <Buttons changeView={changeView} currentView={currentView} />
          {currentView === ButtonsEnum.posts ? <Posts /> : <Liked />}
          <PostCreation
            isOpen={modalIsOpen}
            setIsOpen={setModalIsOpen}
            disableScroll
          />
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
