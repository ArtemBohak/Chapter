import { FC, useRef } from "react";

import { LikesModalProps } from "./LikesModal.type";
import styles from "./LikesModal.module.scss";

import { Modal, Icon, IconEnum } from "..";

const LikesModal: FC<LikesModalProps> = ({
  isOpen,
  setIsOpen,
  title = "Followers",
}) => {
  const { current: screenSize } = useRef(window.innerWidth);

  const swipeIsOn = screenSize < 769;
  const transition = {
    enter: styles["modal-enter"],
    enterActive: styles["modal-enter-active"],
    exit: styles["modal-exit"],
    exitActive: styles["modal-exit-active"],
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      transitionClassName={transition}
      backdropClassName={styles["modal"]}
      bodyClassName={styles["modal__body"]}
      transitionTimeOut={200}
      swipeIsOn={swipeIsOn}
    >
      <button>
        <Icon icon={IconEnum.ArrowRight} size={32} />
      </button>
      <h3>{title}</h3>
    </Modal>
  );
};

export default LikesModal;
