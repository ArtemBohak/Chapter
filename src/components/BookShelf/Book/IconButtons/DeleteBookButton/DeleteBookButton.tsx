import { Icon, IconEnum } from "@/src/components";
import { FC } from "react";
import styles from "../IconsButtons.module.scss";
import { useBooksPageContext } from "@/src/pages/BooksPage/context/hooks/useBooksPageContext";
import { DeleteBookModal } from "../../../DeleteBookModal";

const DeleteBookButton: FC = () => {
  const { isDeleteBookModalOpen, setIsDeleteBookModalOpen } =
    useBooksPageContext();
  const onHandleClick = () => {
    setIsDeleteBookModalOpen(true);
  };
  return (
    <>
      <button onClick={onHandleClick} className={styles["delete-button"]}>
        {<Icon icon={IconEnum.Close} />}
      </button>
      <DeleteBookModal
        isOpen={isDeleteBookModalOpen}
        setIsOpen={setIsDeleteBookModalOpen}
      />
    </>
  );
};

export default DeleteBookButton;
