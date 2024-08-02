import { FC } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";

import { useModal } from "@/src/hooks";
import { links } from "@/src/types";
import { ContactUs, CustomModal, Icon, IconEnum } from "..";

import { MenuProps } from "./Menu.type";
import styles from "./Menu.module.scss";

const Menu: FC<MenuProps> = (props) => {
  const contactUs = useModal();
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
        <Icon
          icon={IconEnum.ArrowLeft}
          removeInlineStyle
          size={32}
          className="-rotate-90"
        />
      </button>
      <ul className={styles["list"]}>
        <li>
          <button
            className={"menu-btn"}
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
            // onClick={async () => await logout()}
          >
            <Icon icon={IconEnum.SignOut} className={styles["menu-btn-icon"]} />
            <span className={styles["menu-btn-text"]}>Log out</span>
          </button>
        </li>
      </ul>
      <ContactUs {...contactUs} />
    </CustomModal>
  );
};

export default Menu;
