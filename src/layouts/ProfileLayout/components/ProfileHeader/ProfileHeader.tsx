import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useNavigationToggler } from "@/src/context/NavigationToggler";

import {
  UserAvatar,
  UIbutton,
  MenuToggler,
  SearchField,
} from "@/src/components";

import styles from "./ProfileHeader.module.scss";

const getPageNameByPath = (path: string = "/profile"): string => {
  const splitedPath = path.split("/");
  const pageName = splitedPath[splitedPath.length - 1];
  return pageName === "profile" ? "Feed" : pageName;
};

const ProfileHeader: FC = () => {
  const { isActiveMenu, setIsActiveMenu } = useNavigationToggler();
  const location = useLocation();
  const userName = "User name";
  const userAvatar = "https://i.postimg.cc/LX0WVXCB/Follow-web-1.webp";

  return (
    <header className={styles["profile-header"]}>
      <div className={styles["profile-header__container"]}>
        <NavLink to="/profile">
          <h1 className={styles["profile-header__heading"]}>
            {getPageNameByPath(location.pathname)}
          </h1>
        </NavLink>
        <div className={styles["profile-header__auth-side"]}>
          <SearchField
            id={"search-field"}
            name={"search-field"}
            dataAutomation={"search-field"}
            className={styles["profile-header__search-field"]}
          />
          <UIbutton
            size="small"
            isCustomIcon
            dataAutomation={"addPostButton"}
            className={styles["add-post-button"]}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M2.66602 15.9993C2.66602 9.71396 2.66602 6.57126 4.61864 4.61864C6.57126 2.66602 9.71396 2.66602 15.9993 2.66602C22.2847 2.66602 25.4274 2.66602 27.3801 4.61864C29.3327 6.57126 29.3327 9.71396 29.3327 15.9993C29.3327 22.2847 29.3327 25.4274 27.3801 27.3801C25.4274 29.3327 22.2847 29.3327 15.9993 29.3327C9.71396 29.3327 6.57126 29.3327 4.61864 27.3801C2.66602 25.4274 2.66602 22.2847 2.66602 15.9993Z"
                stroke="#FFFBFE"
                stroke-width="2"
              />
              <path
                d="M20 16L16 16M16 16L12 16M16 16L16 12M16 16L16 20"
                stroke="#FFFBFE"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
            Add post
          </UIbutton>
          <UserAvatar
            src={userAvatar}
            alt={userName}
            className={styles["profile-header__user-avatar"]}
          />
          <MenuToggler
            className={styles["profile-header__menu-toggler"]}
            onClick={() => setIsActiveMenu && setIsActiveMenu(!isActiveMenu)}
          />
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
