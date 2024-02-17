import { FC, useEffect, useState } from "react";

import { useModalsContext } from "@/src/context";
import styles from "./ProfilePage.module.scss";
import Profile from "./components/Profile/Profile";
import Buttons from "./components/Buttons/Buttons";
import { ButtonsEnum } from "./components/Buttons/Buttons.type";
import UserPosts from "./components/UserPosts/UserPosts";
import Liked from "./components/UserLikedPosts/UserLikedPosts";
import { PostCreation } from "@/src/components";

const ProfilePage: FC = () => {
  const { setHeaderAddPostBtnIsDisabled } = useModalsContext();
  const [currentView, setCurrentView] = useState(ButtonsEnum.posts);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (modalIsOpen) return setHeaderAddPostBtnIsDisabled(true);
    if (!modalIsOpen) return setHeaderAddPostBtnIsDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);

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
          {currentView === ButtonsEnum.posts ? <UserPosts /> : <Liked />}
        </div>
        <PostCreation isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
      </div>
    </section>
  );
};

export default ProfilePage;
