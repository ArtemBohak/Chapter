import { FC } from "react";

import { ModalWindowProps } from "./ModalWindow.type";
import styles from "./ModalWindow.module.scss";
import { Icon, IconEnum, Modal } from "..";

const ModalWindow: FC<ModalWindowProps> = ({
  setIsOpen,
  children,
  ...props
}) => {
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
      enableSwipe
    >
      <button
        onClick={onClick}
        className={`${styles["button"]} ${styles["button--back"]}`}
        data-automation="clickButton"
        aria-label="Close button"
      >
        <Icon icon={IconEnum.Back} size={32} />
      </button>
      <button
        onClick={onClick}
        className={`${styles["button"]} ${styles["button--cross"]}`}
        data-automation="clickButton"
        aria-label="Close button"
      >
        <Icon icon={IconEnum.Cross} size={32} />
      </button>
      <div className={styles["content"]}>{children}</div>
    </Modal>
  );
};

export default ModalWindow;
