import { Icon, IconEnum } from "@/src/components";
import { FC, useState } from "react";
import styles from "../IconButtons.module.scss";
import { DeleteBookModal } from "../../../DeleteBookModal";
import { DeleteBookButtonProps } from "../IconButtons.type";

const DeleteBookButton: FC<DeleteBookButtonProps> = ({ id }) => {
  const [isDeleteBookModalOpen, setIsDeleteBookModalOpen] = useState(false);
  const onHandleClick = () => {
    setIsDeleteBookModalOpen(true);
  };
  return (
    <>
      <button onClick={onHandleClick} className={styles["delete-button"]}>
        {<Icon icon={IconEnum.Close} />}
      </button>
      <DeleteBookModal
        id={id}
        isOpen={isDeleteBookModalOpen}
        setIsOpen={setIsDeleteBookModalOpen}
      />
    </>
  );
};

export default DeleteBookButton;
