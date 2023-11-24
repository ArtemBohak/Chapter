import { Book } from "@/src/components/BookShelf";
import { FC, useEffect, useState } from "react";
import styles from "./BooksList.module.scss";
import { useBooksPageContext } from "../context/hooks/useBooksPageContext";

const BooksList: FC = () => {
  const { edit } = useBooksPageContext();
  const [deleteButtonState, setdeleteButtonState] = useState(true);

  useEffect(() => {
    setdeleteButtonState(!deleteButtonState);
  }, [edit]);

  return (
    <div className={styles["books-list__wrapper"]}>
      {[...new Array(11)].map((_, i) => (
        <Book
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
