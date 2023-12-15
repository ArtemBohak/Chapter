import { FC } from "react";
import { useBooksPageContext } from "../../context";
import styles from "./MobileButtons.module.scss";
import { IconEnum, UIbutton } from "@/src/components";
import { links } from "@/src/types";
import CancelModal from "../CancelModal/CancelModal";
import AddBookModal from "@/src/components/BookShelf/AddBookModal/AddBookModal";

const MobileButtons: FC = () => {
  const {
    edit,
    setEdit,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isAddBookModalOpen,
    setIsAddBookModalOpen,
  } = useBooksPageContext();

  const handleCancel = () => {
    setIsCancelModalOpen(true);
  };
  const handleConfirm = () => {
    setEdit(!edit);
  };
  const handleAddBook = () => {
    setIsAddBookModalOpen(true);
  };

  return (
    <div className={styles["mobile-buttons__wrapper"]}>
      {edit ? (
        <div className={styles["mobile-buttons__buttons-place"]}>
          <UIbutton
            onClick={handleCancel}
            className={styles["button-cancel"]}
            color="secondary"
            dataAutomation="button-cancel"
          >
            Cancel
          </UIbutton>
          <UIbutton
            onClick={handleConfirm}
            className={styles["button-confirm"]}
            size="small"
            dataAutomation="button-confirm"
          >
            Confirm
          </UIbutton>
        </div>
      ) : (
        <div className={styles["mobile-buttons__buttons-place"]}>
          <UIbutton
            onClick={() => setEdit(!edit)}
            className={styles["button-edit"]}
            icon={IconEnum.EditBook}
            color="secondary"
            dataAutomation="button-Edit-book"
          >
            Edit
          </UIbutton>
          <UIbutton
            onClick={handleAddBook}
            className={styles["button-add"]}
            icon={IconEnum.Book}
            size="small"
            dataAutomation="button-Add-book"
          >
            Add new book
          </UIbutton>
        </div>
      )}
      <CancelModal
        isOpen={isCancelModalOpen}
        setIsOpen={setIsCancelModalOpen}
        setEdit={setEdit}
      />
      <AddBookModal
        isOpen={isAddBookModalOpen}
        setIsOpen={setIsAddBookModalOpen}
      />
    </div>
  );
};

export default MobileButtons;
