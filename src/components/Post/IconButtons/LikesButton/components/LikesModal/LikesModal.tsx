import { FC } from "react";

import { useGetScreenSize, useHideElement } from "@/src/hooks";
import { LikesModalProps } from "./LikesModal.type";
import { tabScreen } from "@/src/utils";
import { ElementsId } from "@/src/types";
import styles from "./LikesModal.module.scss";

import { Modal, Icon, IconEnum } from "@/src/components";
import { Likes } from "./components";

const LikesModal: FC<LikesModalProps> = ({
  isOpen,
  setIsOpen,
  title = "Likes",
  totalLikes,
  ...props
}) => {
  const [screenSize] = useGetScreenSize();

  useHideElement(ElementsId.ADD_POST_BTN, isOpen);

  const isMobScreen = screenSize < tabScreen;

  const icon = isMobScreen ? IconEnum.Back : IconEnum.Cross;
  const transition = {
    enter: styles["modal-enter"],
    enterActive: styles["modal-enter-active"],
    exit: styles["modal-exit"],
    exitActive: styles["modal-exit-active"],
  };

  const onHandleClick = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      transitionClassName={transition}
      backdropClassName={styles["modal"]}
      bodyClassName={styles["modal__body"]}
      transitionTimeOut={200}
      enableSwipe={isMobScreen}
      disableScroll
    >
      <div className={styles["modal__body-header"]}>
        <button
          onClick={onHandleClick}
          className={styles["modal__body-close-button"]}
          data-automation="clickButton"
        >
          <Icon icon={icon} size={isMobScreen ? 26 : 32} />
        </button>
        <h4>
          {title} {`(${totalLikes})`}
        </h4>
      </div>
      <div className={styles["modal__body-content"]}>
        <Likes {...props} />
      </div>
    </Modal>
  );
};

export default LikesModal;
