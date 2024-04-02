import { FC, useEffect, useState } from "react";
import styles from "./EditBookModal.module.scss";
import { Modal } from "@/src/components";
import { EditBookModalProps } from "./EditBookModal.type";
import EditBookForm from "./EditBookForm/EditBookForm";
import { CloseButton } from "../Book/IconButtons";
import { IBook } from "../Book/BookProps.type";
import { useAppSelector } from "@/src/redux";

const EditBookModal: FC<EditBookModalProps> = ({
  isOpen,
  setIsOpen,
  bookId,
}) => {
  const [currentBook, setCurrentBook] = useState<IBook>();
  const { user } = useAppSelector((state) => state.userSlice);

  useEffect(() => {
    const currentBook = user.userBooks.find((book) => book.id === bookId);
    setCurrentBook(currentBook);
  }, []);

  return (
    <Modal
      bodyClassName={styles["edit-book-modal__body"]}
      backdropClassName={styles["edit-book-modal__backdrop"]}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      transitionTimeOut={200}
      portal={true}
      disableScroll={true}
    >
      <div className={styles["edit-book-modal__header"]}>
        <h4>Add new book</h4>
        <CloseButton
          className={styles["edit-book-modal__close-button"]}
          setIsOpen={setIsOpen}
        />
      </div>
      <div className={styles["edit-book-modal__wrapper"]}>
        <EditBookForm
          bookId={bookId}
          setIsOpen={setIsOpen}
          currentBook={currentBook}
          prevBookImagePath={currentBook?.imagePath}
        />
      </div>
    </Modal>
  );
};

export default EditBookModal;
