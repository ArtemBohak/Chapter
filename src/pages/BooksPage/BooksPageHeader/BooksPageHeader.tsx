import { FC, useState } from "react";
import styles from "./BooksPageHeader.module.scss";
import { IconEnum, UIbutton } from "@/src/components";

const BooksPageHeader: FC = () => {
  const [edit, setEdit] = useState(false);

  return (
    <div className={styles["books-page-header__wrapper"]}>
      <UIbutton
        className={styles["back-to-profile"]}
        icon={IconEnum.ArrowLeft}
        color="secondary"
        dataAutomation="Back-to-profile"
      >
        Back to profile
      </UIbutton>
      {edit ? (
        <div className="flex gap-5">
          <UIbutton
            className={styles["button-cancel"]}
            color="secondary"
            dataAutomation="Edit-book"
          >
            Cancel
          </UIbutton>
          <UIbutton
            onClick={() => setEdit(!edit)}
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
            {edit ? "Cancel" : "Edit"}
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
    </div>
  );
};

export default BooksPageHeader;
