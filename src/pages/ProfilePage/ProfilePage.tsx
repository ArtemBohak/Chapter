import { FC, useEffect, useState } from "react";

import styles from "./ProfilePage.module.scss";
import Profile from "./components/Profile/Profile";
import Posts from "./components/Posts/Posts";
import Buttons from "./components/Buttons/Buttons";

const ProfilePage: FC = () => {
  const [postsButton, setPostsButton] = useState<boolean>(false);

  const handlePostTumbler = (postsButton: boolean) => {
    setPostsButton(!postsButton);
  };

  return (
    <>
      <div className={styles["profile-conteiner"]}>
        <Profile />
        <div className="laptop:w-2/3 laptop:max-h-[720px] overflow-auto flex flex-col items-stretch">
          <Buttons />
          {postsButton ? (
            <Posts />
          ) : (
            <div className="bg-red"> sadasdasdasd</div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
