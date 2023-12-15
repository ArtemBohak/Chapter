import { Modal, UIbutton } from "@/src/components";
import { FC } from "react";
import styles from "./DeleteBookModal.module.scss";
import { DeleteModalProps } from "./DeleteBookModal.type";
import { useBooksPageContext } from "@/src/pages/BooksPage/context";

const DeleteBookModal: FC<DeleteModalProps> = ({ isOpen, setIsOpen, id }) => {
  const { deleteIdList } = useBooksPageContext();
  const onHandleClickCancel = () => {
    setIsOpen(false);
  };
  const onHandleClickConfirm = () => {
    deleteIdList.push(id);
    setIsOpen(false);
    console.log(deleteIdList);
  };

  return (
    <Modal
      bodyClassName={styles["delete-modal__body"]}
      backdropClassName={styles["delete-modal__backdrop"]}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      transitionTimeOut={200}
      disableScroll
    >
      <div className={styles["delete-modal__wrapper"]}>
        <h4>Are you sure you want to delete this book?</h4>
        <div className={styles["delete-modal__buttons"]}>
          <UIbutton
            onClick={onHandleClickConfirm}
            color="primary"
            dataAutomation={"delete-confirm"}
          >
            Confirm
          </UIbutton>
          <UIbutton
            className={styles["button-cancel"]}
            onClick={onHandleClickCancel}
            color="secondary"
            dataAutomation={"delete-decline"}
          >
            Cancel
          </UIbutton>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteBookModal;
