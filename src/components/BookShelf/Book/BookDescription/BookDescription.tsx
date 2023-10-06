import styles from "../Book.module.scss";

const BookDescription = () => {
  return (
    <>
      <h5 className={styles["book-info__title"]}>{"Title"}</h5>
      <p className={styles["book-info__author"]}>{"Author"}</p>
      <p className={styles["book-info__annotation"]}>{"Annotation"}</p>
    </>
  );
};

export default BookDescription;
