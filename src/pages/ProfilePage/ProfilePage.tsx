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
import { useRefIntersection } from "@/src/hooks";
import { intersectionHandlerCB } from "@/src/utils";

const ProfilePage: FC = () => {
  const { setHeaderAddPostBtnIsDisabled, setPage } = useProfileContext();
  const [currentView, setCurrentView] = useState(ButtonsEnum.posts);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const startLoaderRef = useRef(null);
  // const scrollHandler = () => {
  //   const scrollContainer = startLoaderRef.current;
  //   const currentPage = page;
  //   const nextPage = currentPage + 1;

  //   if (scrollContainer) {
  //     const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

  //     if (scrollHeight - (scrollTop + clientHeight) <= 20) {
  //       console.log("SCROLL", nextPage)
  //       setPage(nextPage)
  //     }
  //   }
  // };

  useRefIntersection(intersectionHandlerCB(setPage), startLoaderRef, {
    // postsIsLoad: ,
    threshold: 1,
  });

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
      <PostsProvider>
        <div className={styles["view-block-wrapper"]}>
          <div ref={startLoaderRef} data-value={1} className="hide-element" />
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
