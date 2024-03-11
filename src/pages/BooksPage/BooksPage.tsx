import { FC } from "react";
import BooksList from "./Components/BooksList/BooksList";
import BooksPageHeader from "./Components/BooksPageHeader/BooksPageHeader";
import BooksPageProvider from "./context/BooksPageProvider";
import styles from "./BookPage.module.scss";
import MobileButtons from "./Components/MobileButtons/MobileButtons";

const BooksPage: FC = () => {
  return (
    <BooksPageProvider>
      <div className={styles["book-page__wrapper"]}>
        <BooksPageHeader userType="me" />
        <BooksList />
        <MobileButtons />
      </div>
    </BooksPageProvider>
  );
};

export default BooksPage;
