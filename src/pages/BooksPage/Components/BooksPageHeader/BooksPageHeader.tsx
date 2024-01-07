import { FC } from "react";
import styles from "./BooksPageHeader.module.scss";
import { IconEnum, UIbutton } from "@/src/components";
import { links } from "@/src/types";
import { useBooksPageContext } from "../../context/hooks/useBooksPageContext";
import CancelModal from "../CancelModal/CancelModal";
import { deleteMultipleBooksApi } from "@/src/components/BookShelf/DeleteBookModal/DeleteBookApi";
import AddBookModal from "@/src/components/BookShelf/AddBookModal/AddBookModal";
import { booksPageHeaderProps } from "./BooksPageHeader.type";

const BooksPageHeader: FC<booksPageHeaderProps> = ({ user }) => {
  const {
    edit,
    setEdit,
    isCancelModalOpen,
    setIsCancelModalOpen,
    isAddBookModalOpen,
    setIsAddBookModalOpen,
    deleteIdList,
  } = useBooksPageContext();

  const handleCancel = () => {
    setIsCancelModalOpen(true);
  };
  const handleConfirm = async () => {
    deleteMultipleBooksApi(deleteIdList);
    setEdit(!edit);
  };
  const handleAddBook = () => {
    setIsAddBookModalOpen(true);
  };

  return (
    <div className={styles["books-page-header__wrapper"]}>
      <UIbutton
        className={styles["back-to-profile"]}
        icon={IconEnum.ArrowLeft}
        color="secondary"
        dataAutomation="Back-to-profile"
        href={user === "me" ? links.PROFILE : "/49"}
      >
        <p className={styles["back-to-profile__text"]}>Back to profile</p>
      </UIbutton>
      <h2 className={styles["books-page-header__title"]}>Library</h2>
      {user === "me" && (
        <>
          {edit ? (
            <div className="flex gap-5">
              <UIbutton
                onClick={handleCancel}
                className={styles["button-cancel"]}
                color="secondary"
                dataAutomation="Edit-book"
              >
                Cancel
              </UIbutton>
              <UIbutton
                onClick={handleConfirm}
                className={styles["button-confirm"]}
                size="small"
                dataAutomation="Add-book"
              >
                Confirm
              </UIbutton>
            </div>
          ) : (
            <div className="flex gap-5">
              <UIbutton
                onClick={() => setEdit(!edit)}
                className={styles["button-edit"]}
                icon={IconEnum.EditBook}
                color="secondary"
                dataAutomation="Edit-book"
              >
                Edit
              </UIbutton>
              <UIbutton
                onClick={handleAddBook}
                className={styles["button-add"]}
                icon={IconEnum.Book}
                size="small"
                dataAutomation="Add-book"
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
        </>
      )}
    </div>
  );
};

export default BooksPageHeader;
