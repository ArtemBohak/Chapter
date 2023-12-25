import { FC, useState } from "react";
import styles from "./AddBookSliderButton.module.scss";
import { Icon, IconEnum } from "../..";
import AddBookModal from "../AddBookModal/AddBookModal";

const AddBookSliderButton: FC = () => {
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsAddBookModalOpen(true);
  };
  return (
    <div className={styles["add-book-slider-button"]}>
      <button
        onClick={handleOpenModal}
        className={styles["add-book-slider-button__icon"]}
      >
        <Icon icon={IconEnum.PlusOrange} />
      </button>
      <AddBookModal
        isOpen={isAddBookModalOpen}
        setIsOpen={setIsAddBookModalOpen}
      />
    </div>
  );
};

export default AddBookSliderButton;
