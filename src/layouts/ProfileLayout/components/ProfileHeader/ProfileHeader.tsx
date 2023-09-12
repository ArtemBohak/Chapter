import { FC } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { links } from "@/src/utils/links/links.types";

import { useNavigationToggler } from "@/src/context/NavigationToggler";

import {
  UserAvatar,
  UIbutton,
  MenuToggler,
  SearchField,
  Icon,
  IconEnum,
} from "@/src/components";

import styles from "./ProfileHeader.module.scss";
import { useAppSelector } from "@/src/redux/hooks";

const ProfileHeader: FC = () => {
  const { isActiveMenu, setIsActiveMenu } = useNavigationToggler();
  const { loading, user } = useAppSelector((store) => store.userSlice);
  const { firstName, lastName, avatarUrl } = user;

  const defaultUserAvatar = "https://i.postimg.cc/LX0WVXCB/Follow-web-1.webp";

  const getUserAvatar = () => {
    return loading ? defaultUserAvatar : avatarUrl || defaultUserAvatar;
  };

  return (
    <header className={styles["profile-header"]}>
      <div className={styles["profile-header__container"]}>
        <MenuToggler
          isActive={isActiveMenu}
          className={styles["profile-header__menu-toggler"]}
          onClick={() => setIsActiveMenu && setIsActiveMenu(!isActiveMenu)}
        />
        <NavLink
          to={links.FEED}
          className={styles["profile-header__logo-name"]}
        >
          Chapter
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
            dataAutomation="addPostButton"
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
                strokeWidth="2"
              />
              <path
                d="M20 16L16 16M16 16L12 16M16 16L16 12M16 16L16 20"
                stroke="#FFFBFE"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Add post
          </UIbutton>
          <UserAvatar
            src={getUserAvatar()}
            alt={`${firstName} ${lastName}`}
            className={cn(styles["profile-header__user-avatar"])}
          />
          <UIbutton
            href="/"
            variant="text"
            alignIcon="right"
            dataAutomation="notification"
            className="md:hidden"
          >
            <Icon icon={IconEnum.Notification} color="#000000" />
          </UIbutton>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
