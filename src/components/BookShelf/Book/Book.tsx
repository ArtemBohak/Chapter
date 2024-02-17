import { FC, useState } from "react";
import styles from "./Book.module.scss";
import { BooksProps } from "./BookProps.type";
import DeleteBookButton from "./IconButtons/DeleteBookButton/DeleteBookButton";
import FavoriteBookButton from "./IconButtons/FavoriteBookButton/FavoriteBookButton";
import BookInfoModal from "../BookInfoModal/BookInfoModal";

const Book: FC<BooksProps> = ({
  id,
  isFavorite,
  className,
  favoriteButton,
  deleteButton,
  nameOfBook,
  imageClassName,
  titleClassName,
  annotation,
  author,
  bookNameLength,
  bookStatus,
  bookImageUrl,
}) => {
  const [isBookInfoModalOpen, setIsBookInfoModalOpen] = useState(false);

  const onHandleClick = () => {
    setIsBookInfoModalOpen(true);
  };

  const truncatedNameOfBook =
    nameOfBook && nameOfBook.length > bookNameLength
      ? nameOfBook.substring(0, bookNameLength - 3) + "..."
      : nameOfBook;

  return (
    <div className={className || styles["book"]}>
      <img
        className={imageClassName || styles["book-cover"]}
        loading="lazy"
        onClick={onHandleClick}
        src={bookImageUrl}
        alt="BookImage"
      />
      <h5 className={titleClassName || styles["book-name"]} title={nameOfBook}>
        {truncatedNameOfBook}
      </h5>
      {favoriteButton ? (
        <FavoriteBookButton isFavorite={isFavorite} id={id} />
      ) : null}
      {deleteButton ? <DeleteBookButton id={id} /> : null}
      <BookInfoModal
        bookStatus={bookStatus}
        nameOfBook={nameOfBook}
        author={author}
        annotation={annotation}
        isFavorite={isFavorite}
        imagePath={bookImageUrl}
        favoriteButtons={favoriteButton}
        id={id}
        isOpen={isBookInfoModalOpen}
        setIsOpen={setIsBookInfoModalOpen}
      />
    </div>
  );
};

export default Book;
