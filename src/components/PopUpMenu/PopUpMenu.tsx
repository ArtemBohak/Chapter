import { FC } from "react";
import { IPopUpMenuProps } from "./PopUpMenu.type";
import styles from "./PopUpMenu.module.scss";
import { Modal } from "..";

const PopUpMenu: FC<IPopUpMenuProps> = ({
  children,
  nodeRef,
  classNames,
  ...props
}) => {
  return (
    <Modal
      {...props}
      backdropClassName={`${styles["popup-window"]} ${classNames}`}
      bodyClassName={styles["popup-body"]}
    >
      <div className={styles["popup-wrapper"]} ref={nodeRef}>
        {children}
      </div>
    </Modal>
  );
};

export default PopUpMenu;
