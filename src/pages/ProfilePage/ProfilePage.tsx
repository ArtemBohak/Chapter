import { FC, useEffect, useRef, useState } from "react";

import { useProfileContext } from "@/src/context";
import styles from "./ProfilePage.module.scss";
import Profile from "./components/Profile/Profile";
import Buttons from "./components/Buttons/Buttons";
import { ButtonsEnum } from "./components/Buttons/Buttons.type";
import UserPosts from "./components/UserPosts/UserPosts";
import Liked from "./components/UserLikedPosts/UserLikedPosts";
import { PostCreation } from "@/src/components";
import PostsProvider from "./components/UserPosts/context/PostsProvider";


const ProfilePage: FC = () => {
  const { setHeaderAddPostBtnIsDisabled, intersectionRef } = useProfileContext();
  const [currentView, setCurrentView] = useState(ButtonsEnum.posts);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const viewBlockContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (modalIsOpen) return setHeaderAddPostBtnIsDisabled(true);
    if (!modalIsOpen) return setHeaderAddPostBtnIsDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);

  const changeView = (e: React.MouseEvent) => {
    e.preventDefault();
    viewBlockContainerRef.current && viewBlockContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
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
    <section ref={viewBlockContainerRef} className={styles["profile-wrapper"]}>
      <Profile setIsOpen={setModalIsOpen} />
      <PostsProvider>
        <div className={styles["view-block-wrapper"]}>
          <div ref={intersectionRef} data-value={1} className="hide-element" />
          <div className={styles["view-block-container"]}>
            <Buttons changeView={changeView} currentView={currentView} />
            {currentView === ButtonsEnum.posts ? <UserPosts /> : <Liked />}
          </div>
          <PostCreation isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />
        </div>
      </PostsProvider>
    </section>
  );
};

export default ProfilePage;
