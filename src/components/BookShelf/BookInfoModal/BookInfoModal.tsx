import { FC, useMemo, useState } from "react";
import { IconEnum, Modal, UIbutton } from "@/src/components";
import styles from "./BookInfoModal.module.scss";
import { BookInfoModalProps } from "./BookInfoModal.type";
import CloseButton from "../Book/IconButtons/CloseButton/CloseButton";
import FavoriteBookButton from "../Book/IconButtons/FavoriteBookButton/FavoriteBookButton";
import EditBookModal from "../EditBookModal/EditBookModal";


const BookInfoModal: FC<BookInfoModalProps> = ({
  isOpen,
  setIsOpen,
  id,
  nameOfBook,
  author,
  annotation,
  isFavorite,
  bookStatus,
  imagePath,
  favoriteButtons,
}) => {
  const [editeBookInfo, setEditeBookInfo] = useState(false)
  const nameLength = useMemo(() => nameOfBook?.length ?? 0, [nameOfBook]);




  if (editeBookInfo) {
    return (
      <EditBookModal isOpen={editeBookInfo} setIsOpen={setEditeBookInfo} bookId={id} />
    )
  }


  return (
    <Modal
      bodyClassName={styles["book-info__body"]}
      backdropClassName={styles["book-info__backdrop"]}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      transitionTimeOut={200}
      portal={true}
      disableScroll={true}
    >
      <div className={styles["book-info__wrapper"]}>
        <div className={styles["book-info__image"]}>
          <img src={imagePath} alt="Book Image" />
          {favoriteButtons && <FavoriteBookButton
            className={styles["book-info__favorite-button"]}
            isFavorite={isFavorite}
            id={id}
          />}
        </div>
        <div className={styles["book-info__text"]}>
          <div>
            <p className={styles[`book-info__status-${bookStatus}`]}>
              {(bookStatus === 1 && `Goin to read 📚`) ||
                (bookStatus === 2 && `Reading 📖`) ||
                (bookStatus === 3 && `Finished book ✅`)}
            </p>
            <h1
              className={
                nameLength > 20 ? styles["title__long"] : styles["title__short"]
              }
            >
              {nameOfBook}
            </h1>
            <h4>by {author}</h4>
            <p className={styles["book-info__annotation"]}>{annotation}</p>
          </div>
          {favoriteButtons && <UIbutton
            className={styles["book-info__button"]}
            fullWidth={false}
            icon={IconEnum.EditBook}
            dataAutomation={"editBookButton"}
            onClick={() => setEditeBookInfo(true)}
          >
            Edit book info
          </UIbutton>}
        </div>
        <CloseButton setIsOpen={setIsOpen} />
      </div>
    </Modal>
  );

};

export default BookInfoModal;
