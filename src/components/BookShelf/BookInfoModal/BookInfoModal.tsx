import { FC } from "react";
import { IconEnum, Modal, UIbutton } from "@/src/components";
import styles from "./BookInfoModal.module.scss";
import { BookInfoModalProps } from "./BookInfoModal.type";

const BookInfoModal: FC<BookInfoModalProps> = ({ isOpen, setIsOpen, id }) => {
  return (
    <Modal
      bodyClassName={styles["book-info__body"]}
      backdropClassName={styles["book-info__backdrop"]}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      transitionTimeOut={200}
    >
      <div className={styles["book-info__wrapper"]}>
        <div className={styles["book-info__image"]}>
          <img
            src="https://i.ibb.co/hMwh97C/Harry-Potter-Book-Cover.png"
            alt=""
          />
        </div>
        <div className={styles["book-info__text"]}>
          <p>book status</p>
          <h1>Harry Potter</h1>
          <h4>Author</h4>
          <p>
            At the centre of this novel is the passionate love between Catherine
            Earnshaw and Heathcliff - recounted with such emotional intensity
            that a plain tale of the Yorkshire moors acquires the depth and
            simplicity of ancient tragedy. For the Fourth Edition, the editor
            has collated the 1847 text with several modern editions and has
            corrected a number of variants, including accidentals. The text is
            accompanied by entirely new explanatory annotations.
          </p>
          <UIbutton
            className={styles["book-info__button"]}
            fullWidth={false}
            icon={IconEnum.EditBook}
            dataAutomation={""}
          >
            Edit book info
          </UIbutton>
        </div>
      </div>
    </Modal>
  );
};

export default BookInfoModal;
