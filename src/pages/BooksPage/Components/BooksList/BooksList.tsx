import { Book } from "@/src/components/BookShelf";
import { FC, useEffect, useState } from "react";
import styles from "./BooksList.module.scss";
import { useBooksPageContext } from "../../context/hooks/useBooksPageContext";
import { useAppSelector } from "@/src/redux";

const BooksList: FC = () => {
  const [deleteButtonState, setdeleteButtonState] = useState(false);
  const { edit } = useBooksPageContext();
  const { user } = useAppSelector((state) => state.userSlice);
  const { userBooks } = user;

  useEffect(() => {
    if (edit === true) {
      setdeleteButtonState(true);
    } else {
      setdeleteButtonState(false);
    }
  }, [edit]);

  return (
    <div className={styles["books-list__wrapper"]}>
      {userBooks.map((book) => (
        <Book
          bookStatus={book.book_statusId}
          id={book.id}
          isFavorite={book.favorite_book_status}
          nameOfBook={book.nameOfBook}
          author={book.author}
          annotation={book.annotation}
          favoriteButton
          deleteButton={deleteButtonState}
          className={styles["book__wrapper"]}
          imageClassName={styles["book-cover"]}
          titleClassName={styles["book-title"]}
          key={book.id}
          bookNameLength={48}
        />
      ))}
    </div>
  );
};

export default BooksList;
