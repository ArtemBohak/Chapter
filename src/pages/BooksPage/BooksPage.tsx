import { FC } from "react";
import styles from "./BookPage.module.scss";
import Books from "./Books/BooksList";
import BooksPageHeader from "./BooksPageHeader/BooksPageHeader";

const BooksPage: FC = () => {
  return (
    <div className={styles["book-page__wrapper"]}>
      <BooksPageHeader />
      <Books />
    </div>
  );
};

export default BooksPage;
