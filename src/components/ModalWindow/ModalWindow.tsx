import { FC } from "react";

import { ModalWindowProps } from "./ModalWindow.type";
import { tabScreen } from "@/src/utils";
import { useGetScreenSize } from "@/src/hooks";
import styles from "./ModalWindow.module.scss";
import { Icon, IconEnum, Modal } from "..";

const ModalWindow: FC<ModalWindowProps> = ({
  setIsOpen,
  children,
  ...props
}) => {
  const [screenSize] = useGetScreenSize();

  const isMobScreen = screenSize < tabScreen;

  const onClick = () => setIsOpen(false);

  const transition = {
    enter: styles["modal-window-enter"],
    enterActive: styles["modal-window-enter-active"],
    exit: styles["modal-window-exit"],
    exitActive: styles["modal-window-exit-active"],
  };

  return (
    <Modal
      {...props}
      setIsOpen={setIsOpen}
      backdropClassName={styles["modal-window__backdrop"]}
      bodyClassName={styles["modal-window__body"]}
      portal
      transitionClassName={transition}
      enableSwipe={isMobScreen}
    >
      <button
        onClick={onClick}
        className={`${styles["icon-button"]} ${styles["icon-button-back"]}`}
        data-automation="clickButton"
      >
        <Icon icon={IconEnum.Back} size={32} />
      </button>
      <button
        onClick={onClick}
        className={`${styles["icon-button"]} ${styles["icon-button-cross"]}`}
        data-automation="clickButton"
      >
        <Icon icon={IconEnum.Cross} size={32} />
      </button>
      <div className={styles["modal-window__body-content"]}>{children}</div>
    </Modal>
  );
};

export default ModalWindow;
