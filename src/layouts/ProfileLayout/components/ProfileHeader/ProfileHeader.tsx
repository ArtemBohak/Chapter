import { FC, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";

import { ElementsId, UiMessage, links } from "@/src/types";
import { ProfileUpdateApi } from "@/src/pages/SettingsPage/utils/ProfileUpdateApi";
import { useNavigationToggler, useProfileContext } from "@/src/context";
import { useErrorBoundary, useHideElement, useOutsideClick } from "@/src/hooks";
import { fetchIsLogoutUser, useAppDispatch, useAppSelector } from "@/src/redux";
import { ProfileHeaderProps } from "./ProfileHeader.type";
import styles from "./ProfileHeader.module.scss";

import {
  UserAvatar,
  UIbutton,
  MenuToggler,
  PopUpMenu,
  ConfirmationWindow,
  Logo,
} from "@/src/components";

import { SearchBar } from "../SearchBar";

const ProfileHeader: FC<ProfileHeaderProps> = ({ setModalIsOpen }) => {
  const { headerAddPostBtnIsDisabled } = useProfileContext();
  const { isActiveMenu, setIsActiveMenu } = useNavigationToggler();
  const {
    user: { firstName, lastName, avatarUrl },
  } = useAppSelector((store) => store.userSlice);

  const [showLogOutMsg, setShowLogOutMsg] = useState(false);
  const [showDeleteAccMsg, setShowDeleteAccMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setError = useErrorBoundary();
  const dispatch = useAppDispatch();

  const avatarRef = useRef(null);
  const [showPopUp, setShowPopUp] = useState(false);
  useHideElement(ElementsId.ADD_POST_BTN, isActiveMenu);
  useOutsideClick(avatarRef, setShowPopUp, ElementsId.AVATAR);

  const logOut = async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchIsLogoutUser());
    } finally {
      setIsLoading(false);
    }
  };

  const onDeleteAcc = async () => {
    const user = new ProfileUpdateApi(setIsLoading, setError);
    await user.deleteAccount();
  };

  const onHandleClick = () => {
    setModalIsOpen(true);
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
          aria-label="Home nav link"
        >
          <Logo />
        </NavLink>
        <div className={styles["profile-header__auth-side"]}>
          <SearchBar inputClassName={styles["profile-header__search-field"]} />
          <UIbutton
            onClick={onHandleClick}
            size="small"
            isCustomIcon
            dataAutomation="addPostButton"
            className={styles["add-post-button"]}
            disabled={headerAddPostBtnIsDisabled}
            aria-label="Open create post modal button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <mask id="path-1-inside-1_4867_4120" fill="white">
                <path d="M21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H12.75V20.25C12.75 20.4489 12.671 20.6397 12.5303 20.7803C12.3897 20.921 12.1989 21 12 21C11.8011 21 11.6103 20.921 11.4697 20.7803C11.329 20.6397 11.25 20.4489 11.25 20.25V12.75H3.75C3.55109 12.75 3.36032 12.671 3.21967 12.5303C3.07902 12.3897 3 12.1989 3 12C3 11.8011 3.07902 11.6103 3.21967 11.4697C3.36032 11.329 3.55109 11.25 3.75 11.25H11.25V3.75C11.25 3.55109 11.329 3.36032 11.4697 3.21967C11.6103 3.07902 11.8011 3 12 3C12.1989 3 12.3897 3.07902 12.5303 3.21967C12.671 3.36032 12.75 3.55109 12.75 3.75V11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12Z" />
              </mask>
              <path
                d="M21 12C21 12.1989 20.921 12.3897 20.7803 12.5303C20.6397 12.671 20.4489 12.75 20.25 12.75H12.75V20.25C12.75 20.4489 12.671 20.6397 12.5303 20.7803C12.3897 20.921 12.1989 21 12 21C11.8011 21 11.6103 20.921 11.4697 20.7803C11.329 20.6397 11.25 20.4489 11.25 20.25V12.75H3.75C3.55109 12.75 3.36032 12.671 3.21967 12.5303C3.07902 12.3897 3 12.1989 3 12C3 11.8011 3.07902 11.6103 3.21967 11.4697C3.36032 11.329 3.55109 11.25 3.75 11.25H11.25V3.75C11.25 3.55109 11.329 3.36032 11.4697 3.21967C11.6103 3.07902 11.8011 3 12 3C12.1989 3 12.3897 3.07902 12.5303 3.21967C12.671 3.36032 12.75 3.55109 12.75 3.75V11.25H20.25C20.4489 11.25 20.6397 11.329 20.7803 11.4697C20.921 11.6103 21 11.8011 21 12Z"
                fill="#FEFEFE"
              />
              <path
                d="M12.75 12.75V10.75H10.75V12.75H12.75ZM11.25 12.75H13.25V10.75H11.25V12.75ZM11.25 11.25V13.25H13.25V11.25H11.25ZM12 3V5V3ZM12.75 11.25H10.75V13.25H12.75V11.25ZM19 12C19 11.6685 19.1317 11.3505 19.3661 11.1161L22.1945 13.9445C22.7103 13.4288 23 12.7293 23 12H19ZM19.3661 11.1161C19.6005 10.8817 19.9185 10.75 20.25 10.75V14.75C20.9793 14.75 21.6788 14.4603 22.1945 13.9445L19.3661 11.1161ZM20.25 10.75H12.75V14.75H20.25V10.75ZM10.75 12.75V20.25H14.75V12.75H10.75ZM10.75 20.25C10.75 19.9185 10.8817 19.6005 11.1161 19.3661L13.9445 22.1945C14.4603 21.6788 14.75 20.9793 14.75 20.25H10.75ZM11.1161 19.3661C11.3505 19.1317 11.6685 19 12 19V23C12.7293 23 13.4288 22.7103 13.9445 22.1945L11.1161 19.3661ZM12 19C12.3315 19 12.6495 19.1317 12.8839 19.3661L10.0555 22.1945C10.5712 22.7103 11.2707 23 12 23V19ZM12.8839 19.3661C13.1183 19.6005 13.25 19.9185 13.25 20.25H9.25C9.25 20.9793 9.53973 21.6788 10.0555 22.1945L12.8839 19.3661ZM13.25 20.25V12.75H9.25V20.25H13.25ZM11.25 10.75H3.75V14.75H11.25V10.75ZM3.75 10.75C4.08152 10.75 4.39946 10.8817 4.63388 11.1161L1.80546 13.9445C2.32118 14.4603 3.02066 14.75 3.75 14.75V10.75ZM4.63388 11.1161C4.8683 11.3505 5 11.6685 5 12H1C1 12.7293 1.28973 13.4288 1.80546 13.9445L4.63388 11.1161ZM5 12C5 12.3315 4.8683 12.6495 4.63388 12.8839L1.80546 10.0555C1.28973 10.5712 1 11.2707 1 12H5ZM4.63388 12.8839C4.39946 13.1183 4.08152 13.25 3.75 13.25V9.25C3.02065 9.25 2.32118 9.53973 1.80546 10.0555L4.63388 12.8839ZM3.75 13.25H11.25V9.25H3.75V13.25ZM13.25 11.25V3.75H9.25V11.25H13.25ZM13.25 3.75C13.25 4.08152 13.1183 4.39946 12.8839 4.63388L10.0555 1.80546C9.53973 2.32118 9.25 3.02065 9.25 3.75H13.25ZM12.8839 4.63388C12.6495 4.8683 12.3315 5 12 5V1C11.2707 1 10.5712 1.28973 10.0555 1.80546L12.8839 4.63388ZM12 5C11.6685 5 11.3505 4.8683 11.1161 4.63388L13.9445 1.80546C13.4288 1.28973 12.7293 1 12 1V5ZM11.1161 4.63388C10.8817 4.39946 10.75 4.08152 10.75 3.75H14.75C14.75 3.02066 14.4603 2.32118 13.9445 1.80546L11.1161 4.63388ZM10.75 3.75V11.25H14.75V3.75H10.75ZM12.75 13.25H20.25V9.25H12.75V13.25ZM20.25 13.25C19.9185 13.25 19.6005 13.1183 19.3661 12.8839L22.1945 10.0555C21.6788 9.53973 20.9793 9.25 20.25 9.25V13.25ZM19.3661 12.8839C19.1317 12.6495 19 12.3315 19 12H23C23 11.2707 22.7103 10.5712 22.1945 10.0555L19.3661 12.8839Z"
                fill="#FFFBFE"
                mask="url(#path-1-inside-1_4867_4120)"
              />
            </svg>
            Add post
          </UIbutton>
          <UserAvatar
            src={avatarUrl}
            alt={`${firstName} ${lastName}`}
            className={cn(styles["profile-header__user-avatar"])}
            onClick={() => setShowPopUp(!showPopUp)}
          />
          <UIbutton
            onClick={onHandleClick}
            id={ElementsId.ADD_POST_BTN}
            size="small"
            variant="text"
            isCustomIcon
            dataAutomation="addPostButton"
            className="md:hidden"
            disabled={headerAddPostBtnIsDisabled}
            aria-label="Open create post modal button"
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
                stroke="#FFBD5A"
                strokeWidth="2"
              />
              <path
                d="M20 16L16 16M16 16L12 16M16 16L16 12M16 16L16 20"
                stroke="#FFBD5A"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </UIbutton>
        </div>
      </div>
      <PopUpMenu
        isOpen={showPopUp}
        setIsOpen={setShowPopUp}
        nodeRef={avatarRef}
        backdropClassName={styles["popup"]}
        bodyClassName={styles["popup__body"]}
        contentWrapperClassNames={styles["popup__content-wrapper"]}
      >
        <>
          <button
            data-automation="clickButton"
            aria-label="Open confirmation modal button"
            onClick={() => setShowLogOutMsg(true)}
          >
            Log out of profile
          </button>
          <button
            data-automation="clickButton"
            aria-label="Open confirmation modal button"
            onClick={() => setShowDeleteAccMsg(true)}
          >
            Delete user account
          </button>
        </>
      </PopUpMenu>
      <ConfirmationWindow
        text={UiMessage.LOG_OUT}
        isLoading={isLoading}
        isOpen={showLogOutMsg}
        setIsOpen={setShowLogOutMsg}
        fetch={logOut}
      />
      <ConfirmationWindow
        text={UiMessage.DELETE}
        isLoading={isLoading}
        isOpen={showDeleteAccMsg}
        setIsOpen={setShowDeleteAccMsg}
        fetch={onDeleteAcc}
      />
    </header>
  );
};

export default ProfileHeader;
