import { FC } from "react";
import styles from "./Book.module.scss";
import { BooksProps } from "./BookProps.type";
import { Icon, IconEnum } from "../../Icon";

const Book: FC<BooksProps> = ({ className, favoriteButton, deleteButton }) => {
  return (
    <div className={className || styles["book"]}>
      <img
        src="https://s3-alpha-sig.figma.com/img/0c6e/a6af/3905a1d6b763f5466f2b801f33344a99?Expires=1700438400&Signature=St7Ux88i1EY3iVQrvsfJC1bOClTjYdKRXr912iuHEuvAulHdqIFHYpy0-WbmB1hEqjGmiIfwa83mpJROghPGA8kqW4YivqPS1t-pRcTvmXdQqc24dbEuruxe8yo5LomJodEca~SJiXAe2A4rHlAymMR5klVjC1mZxKYIiM5RgExTPDlylJ~DQhDrxN~RRZpBixvlubm68-BCsEN3puhvc-lovhHX61FpudQwzwlPDv4Vi9rGcQjzaWYbkqEFIDnMJ0gSYKebcQOib-wmWwa1hiNqZO2SEq~YF7Z-~ByRDj3wWRPca2oqwhIliJDLzfUbccu1jvr4lPw5zJ8tZ995sw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
        alt=""
      />
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
