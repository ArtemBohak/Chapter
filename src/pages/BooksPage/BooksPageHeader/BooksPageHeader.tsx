import { FC } from "react";
import styles from "./BooksPageHeader.module.scss";
import { IconEnum, UIbutton } from "@/src/components";
import { links } from "@/src/types";
import { useBooksPageContext } from "../context/hooks/useBooksPageContext";
import CancelModal from "../CancelModal/CancelModal";

const BooksPageHeader: FC = () => {
  const { edit, setEdit, isModalOpen, setIsModalOpen } = useBooksPageContext();

  const handleCancel = () => {
    setEdit(!edit);
    setIsModalOpen(true);
  };
  const handleConfirm = () => {
    setEdit(!edit);
  };

  return (
    <div className={styles["books-page-header__wrapper"]}>
      <UIbutton
        className={styles["back-to-profile"]}
        icon={IconEnum.ArrowLeft}
        color="secondary"
        dataAutomation="Back-to-profile"
        href={links.PROFILE}
      >
        Back to profile
      </UIbutton>
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
            className={styles["button-add"]}
            icon={IconEnum.Book}
            size="small"
            dataAutomation="Add-book"
          >
            Add new book
          </UIbutton>
        </div>
      )}
      <CancelModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default BooksPageHeader;
