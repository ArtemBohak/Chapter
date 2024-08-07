import { FC, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import { fetchIsLogoutUser, useAppDispatch } from "@/src/redux";
import { useModal } from "@/src/hooks";
import { links, UiMessage } from "@/src/types";
import { ConfirmationWindow, ContactUs, CustomModal, Icon, IconEnum } from "..";

import { MenuProps } from "./Menu.type";
import styles from "./Menu.module.scss";

const Menu: FC<MenuProps> = (props) => {
  const dispatch = useAppDispatch();
  const contactUs = useModal();

  const [isLoading, setIsLoading] = useState(false);
  const [confirmModalIsShown, setConfirmModalIsShown] = useState(false);

  const logOut = async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchIsLogoutUser());
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CustomModal
      {...props}
      classNames={styles["backdrop"]}
      activeClassNames={cn({
        [styles["active"]]: props.visible,
      })}
      enableSwipe
      enableSwipeOnScreen={1920}
      axis="clientY"
    >
      <button className={styles["button"]} onClick={() => props.close()}>
        <Icon icon={IconEnum.ArrowLeft} size={32} className="-rotate-90" />
      </button>
      <ul className={styles["list"]}>
        <li>
          <button
            className={styles["menu-btn"]}
            onClick={() => {
              contactUs.setActive(true);
            }}
          >
            <Icon icon={IconEnum.Edit} className={styles["menu-btn-icon"]} />
            <span className={styles["menu-btn-text"]}>Contact us</span>
          </button>
        </li>
        <li>
          <Link
            className={styles["menu-btn"]}
            to={links.SETTINGS}
            onClick={() => {
              props.close();
              props.setIsActiveMenu && props.setIsActiveMenu(false);
            }}
          >
            <Icon
              icon={IconEnum.Settings}
              className={styles["menu-btn-icon"]}
            />
            <span className={styles["menu-btn-text"]}>Settings</span>
          </Link>
        </li>
        <li>
          <button
            className={styles["menu-btn"]}
            onClick={() => setConfirmModalIsShown(true)}
          >
            <Icon icon={IconEnum.SignOut} className={styles["menu-btn-icon"]} />
            <span className={styles["menu-btn-text"]}>Log out</span>
          </button>
        </li>
      </ul>
      <ContactUs {...contactUs} />
      <ConfirmationWindow
        isOpen={confirmModalIsShown}
        setIsOpen={setConfirmModalIsShown}
        text={UiMessage.LOG_OUT}
        isLoading={isLoading}
        fetch={logOut}
      />
    </CustomModal>
  );
};

export default Menu;
