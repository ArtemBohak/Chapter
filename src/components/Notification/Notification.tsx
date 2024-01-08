import { FC } from "react";
import { NotificationProps } from "./Notification.type";
import styles from "./Notification.module.scss";
import { ModalWindow, UIbutton } from "..";

const Notification: FC<NotificationProps> = ({
  setIsOpen,
  isOpen,
  btnText,
  children,
}) => {
  const onClick = () => {
    setIsOpen(false);
  };
  return (
    <ModalWindow isOpen={isOpen} setIsOpen={setIsOpen}>
      <p className={styles["modal-text"]}>{children}</p>
      <div className={styles["modal-btn"]}>
        <UIbutton dataAutomation="clickButton" onClick={onClick} fullWidth>
          {btnText}
        </UIbutton>
      </div>
    </ModalWindow>
  );
};

export default Notification;
