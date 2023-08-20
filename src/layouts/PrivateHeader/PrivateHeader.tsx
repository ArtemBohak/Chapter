import { FC } from "react";
import { NavLink } from "react-router-dom";

import plusIcon from "src/assets/SVG/plus.svg";

import styles from "./PrivateHeader.module.scss";
import { UserAvatar, UIbutton, MenuToggler } from "@/src/components";

const PrivateHeader: FC = () => {
  const userName = "User name";
  const userAvatar = "https://i.postimg.cc/LX0WVXCB/Follow-web-1.webp";

  return (
    <header className={styles["admin-header"]}>
      <div className={styles["admin-header__container"]}>
        <NavLink to="/admin">
          <h1 className={styles["admin-header__heading"]}>Profile</h1>
        </NavLink>
        <div className={styles["admin-header__auth-side"]}>
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
          <UserAvatar src={userAvatar} alt={userName} className="ml-[16px]" />
          <MenuToggler
            className={styles["admin-header__menu-toggler"]}
            onClick={() => console.log(1)}
          />
        </div>
      </div>
    </header>
  );
};

export default PrivateHeader;
