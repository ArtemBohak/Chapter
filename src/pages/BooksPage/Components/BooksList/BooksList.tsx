import { Book } from "@/src/components/BookShelf";
import { FC, useEffect, useState } from "react";
import styles from "./BooksList.module.scss";
import { useBooksPageContext } from "../../context/hooks/useBooksPageContext";

const BooksList: FC = () => {
  const [deleteButtonState, setdeleteButtonState] = useState(false);
  const { edit, books } = useBooksPageContext();

  useEffect(() => {
    if (edit === true) {
      setdeleteButtonState(true);
    } else {
      setdeleteButtonState(false);
    }
  }, [edit]);

  return (
    <div className={styles["books-list__wrapper"]}>
      {books.map((book, i) => (
        <Book
          id={book.id}
          isFavorite={book.favorite_book_status}
          nameOfBook={book.nameOfBook}
          favoriteButton
          deleteButton={deleteButtonState}
          className={styles["book__wrapper"]}
          key={i}
        />
      ))}
    </div>
  );
};

export default BooksList;
