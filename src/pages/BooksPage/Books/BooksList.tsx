import { Book } from "@/src/components/BookShelf";
import { FC } from "react";
import styles from "./BooksList.module.scss";

const BooksList: FC = () => {
  return (
    <div className={styles["books-list__wrapper"]}>
      {[...new Array(10)].map((_, i) => (
        <Book
          favoriteButton
          deleteButton
          className={styles["book__wrapper"]}
          key={i}
        />
      ))}
    </div>
  );
};

export default BooksList;
