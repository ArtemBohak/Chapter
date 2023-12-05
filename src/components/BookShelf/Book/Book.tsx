import { FC } from "react";
import styles from "./Book.module.scss";
import { BooksProps } from "./BookProps.type";
import DeleteBookButton from "./IconButtons/DeleteBookButton/DeleteBookButton";
import FavoriteBookButton from "./IconButtons/FavoriteBookButton/FavoriteBookButton";
import BookInfoModal from "../BookInfoModal/BookInfoModal";
import { useBooksPageContext } from "@/src/pages/BooksPage/context/hooks/useBooksPageContext";

const Book: FC<BooksProps> = ({
  id,
  isFavorite,
  className,
  favoriteButton,
  deleteButton,
  nameOfBook,
}) => {
  const { isBookInfoModalOpen, setIsBookInfoModalOpen } = useBooksPageContext();

  const onHandleClick = () => {
    setIsBookInfoModalOpen(true);
    console.log("open", id);
  };
  return (
    <div className={className || styles["book"]}>
      <img
        onClick={onHandleClick}
        src="https://i.ibb.co/hMwh97C/Harry-Potter-Book-Cover.png"
        alt="BookImage"
      />
      <p>{nameOfBook}</p>
      {favoriteButton ? (
        <FavoriteBookButton isFavorite={isFavorite} id={id} />
      ) : null}
      {deleteButton ? <DeleteBookButton /> : null}
      <BookInfoModal
        id={id}
        isOpen={isBookInfoModalOpen}
        setIsOpen={setIsBookInfoModalOpen}
      />
    </div>
  );
};

export default Book;
