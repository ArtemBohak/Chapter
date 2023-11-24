import { FC } from "react";
import styles from "./Book.module.scss";
import { BooksProps } from "./BookProps.type";
import { Icon, IconEnum } from "../../Icon";

const Book: FC<BooksProps> = ({ className, favoriteButton, deleteButton }) => {
  return (
    <div className={className || styles["book"]}>
      <img src="https://i.ibb.co/NWSjYGg/image1984.png" alt="" />
      <p>Harry Potter and the Philosopher's Stone</p>
      {favoriteButton ? (
        <button className={styles["favorite-button"]}>
          {<Icon icon={IconEnum.FavoriteActive} />}
        </button>
      ) : null}
      {deleteButton ? (
        <button className={styles["delete-button"]}>
          {<Icon icon={IconEnum.Close} />}
        </button>
      ) : null}
    </div>
  );
};

export default Book;
