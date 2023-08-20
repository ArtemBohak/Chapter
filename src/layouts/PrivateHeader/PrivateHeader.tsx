import { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { useNavigationToggler } from "@/src/context/NavigationToggler";

import {
  UserAvatar,
  UIbutton,
  MenuToggler,
  SearchField,
} from "@/src/components";

import plusIcon from "src/assets/SVG/plus.svg";
import styles from "./PrivateHeader.module.scss";

const getPageNameByPath = (path: string = "/admin"): string => {
  const splitedPath = path.split("/");
  const pageName = splitedPath[splitedPath.length - 1];
  return pageName === "admin" ? "Feed" : pageName;
};

const PrivateHeader: FC = () => {
  const { isActiveMenu, setIsActiveMenu } = useNavigationToggler();
  const location = useLocation();
  const userName = "User name";
  const userAvatar = "https://i.postimg.cc/LX0WVXCB/Follow-web-1.webp";

  return (
    <header className={styles["admin-header"]}>
      <div className={styles["admin-header__container"]}>
        <NavLink to="/admin">
          <h1 className={styles["admin-header__heading"]}>
            {getPageNameByPath(location.pathname)}
          </h1>
        </NavLink>
        <div className={styles["admin-header__auth-side"]}>
          <SearchField
            id={"search-field"}
            name={"search-field"}
            dataAutomation={"search-field"}
            className={styles["admin-header__search-field"]}
          />
          <UIbutton
            variant="orange-contained"
            dataAutomation={"addPostButton"}
            className={styles["add-post-button"]}
          >
            <img
              src={plusIcon}
              alt=""
              className={styles["add-post-button__icon"]}
            />
            Add post
          </UIbutton>
          <UserAvatar
            src={userAvatar}
            alt={userName}
            className={styles["admin-header__user-avatar"]}
          />
          <MenuToggler
            className={styles["admin-header__menu-toggler"]}
            onClick={() => setIsActiveMenu && setIsActiveMenu(!isActiveMenu)}
          />
        </div>
      </div>
    </header>
  );
};

export default PrivateHeader;
