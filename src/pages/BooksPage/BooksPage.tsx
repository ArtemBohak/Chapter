import { FC } from "react";
import BooksList from "./BooksList/BooksList";
import BooksPageHeader from "./BooksPageHeader/BooksPageHeader";
import BooksPageProvider from "./context/BooksPageProvider";
import styles from "./BookPage.module.scss";

const BooksPage: FC = () => {
  return (
    <BooksPageProvider>
      <div className={styles["book-page__wrapper"]}>
        <BooksPageHeader />
        <BooksList />
      </div>
    </BooksPageProvider>
  );
};

export default BooksPage;
