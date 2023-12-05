import { FC } from "react";
import styles from "./AddBookModal.module.scss";
import { Modal } from "@/src/components";
import { AddBookModalProps } from "./AddBookModal.type";
import AddBookForm from "./AddBookForm/AddBookForm";

const AddBookModal: FC<AddBookModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal
      bodyClassName={styles["add-book-modal__body"]}
      backdropClassName={styles["add-book-modal__backdrop"]}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      transitionTimeOut={200}
    >
      <div className={styles["add-book-modal__wrapper"]}>
        <AddBookForm />
      </div>
    </Modal>
  );
};

export default AddBookModal;
