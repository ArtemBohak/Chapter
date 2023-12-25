import { FC } from "react";
import { ConfirmationWindowProps } from "./ConfirmationWindow.type";
import styles from "./ConfirmationWindow.module.scss";
import { Modal, UIbutton } from "..";

const ConfirmationWindow: FC<ConfirmationWindowProps> = ({
  text,
  confirmText = "Yes",
  deniedText = "No",
  isLoading = false,
  fetch,
  setIsOpen,
  ...props
}) => {
  return (
    <Modal
      {...props}
      setIsOpen={setIsOpen}
      portal
      backdropClassName={styles["backdrop"]}
      bodyClassName={styles["body"]}
      disableScroll
    >
      <p>{text}</p>
      <div className={styles["buttons"]}>
        <UIbutton
          dataAutomation="clickButton"
          disabled={isLoading}
          onClick={() => setIsOpen(false)}
        >
          {deniedText}
        </UIbutton>
        <UIbutton
          dataAutomation="clickButton"
          disabled={isLoading}
          onClick={fetch}
        >
          {confirmText}
        </UIbutton>
      </div>
    </Modal>
  );
};

export default ConfirmationWindow;
