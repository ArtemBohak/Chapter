import { Book } from "@/src/components/BookShelf";
import { FC, useEffect, useState } from "react";
import styles from "./BooksList.module.scss";
import { useBooksPageContext } from "../../context/hooks/useBooksPageContext";
import { useAppSelector } from "@/src/redux";
import { IBook } from "@/src/components/BookShelf/Book/BookProps.type";
import { BooksListProps } from "./BooksList.type";

const BooksList: FC<BooksListProps> = ({ guestBooks }) => {
  const [deleteButtonState, setdeleteButtonState] = useState(false);
  const { edit } = useBooksPageContext();
  const { user } = useAppSelector((state) => state.userSlice);
  const { userBooks } = user;
  const [BooksList, setBooksList] = useState<[] | IBook[]>([]);

  useEffect(() => {
    if (edit === true) {
      setdeleteButtonState(true);
    } else {
      setdeleteButtonState(false);
    }
  }, [edit]);

  useEffect(() => {
    if (guestBooks) {
      setBooksList(guestBooks)
    }
    if (!guestBooks) {
      setBooksList(userBooks);
    }

  }, [userBooks, guestBooks]);

  return (
    <div className={styles["books-list__wrapper"]}>
      {BooksList.map((book) => (
        <Book
          bookStatus={book.book_statusId}
          id={book.id}
          isFavorite={book.favorite_book_status}
          nameOfBook={book.nameOfBook}
          author={book.author}
          annotation={book.annotation}
          bookImageUrl={book.imagePath}
          favoriteButton={guestBooks ? false : true}
          deleteButton={deleteButtonState}
          className={styles["book__wrapper"]}
          imageClassName={styles["book-cover"]}
          titleClassName={styles["book-title"]}
          key={book.id}
          bookNameLength={25}
        />
      ))}
    </div>
  );
};

export default BooksList;
