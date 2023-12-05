import { Modal, UIbutton } from "@/src/components";
import { FC } from "react";
import styles from "./CancelModal.module.scss";
import { CancelModalProps } from "./CancelModal.type";

const CancelModal: FC<CancelModalProps> = ({ isOpen, setIsOpen, setEdit }) => {
  const onHandleClickCancel = () => {
    setIsOpen(false);
  };
  const onHandleClickConfirm = () => {
    setIsOpen(false);
    setEdit(false);
  };

  return (
    <Modal
      bodyClassName={styles["cancel-modal__body"]}
      backdropClassName={styles["cancel-modal__backdrop"]}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      transitionTimeOut={200}
    >
      <div className={styles["cancel-modal__wrapper"]}>
        <h4>Are you sure you want to cancel all changes?</h4>
        <div className={styles["cancel-modal__buttons"]}>
          <UIbutton
            onClick={onHandleClickConfirm}
            color="primary"
            dataAutomation={"cancel-confirm"}
          >
            Confirm
          </UIbutton>
          <UIbutton
            className={styles["button-cancel"]}
            onClick={onHandleClickCancel}
            color="secondary"
            dataAutomation={"cancel-decline"}
          >
            Cancel
          </UIbutton>
        </div>
      </div>
    </Modal>
  );
};

export default CancelModal;
