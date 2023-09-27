import { FC, useEffect, useState } from "react";
import styles from "./Book.module.scss";

const Book: FC = ({ title, author, annotation }) => {
  const [activeBook, setActiveBook] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  // const [responseImg, setResponseImg] = useState("");
  // const [responseText, setResponseText] = useState("");
  // const [title, setTitle] = useState("");

  // const bookApi = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://openlibrary.org/works/OL63073W.json"
  //     );

  //     console.log(response.data);

  //     const { description, thumbnail_url, title } = response.data;
  //     setResponseText(description);
  //     setResponseImg(thumbnail_url);
  //     setTitle(title);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   bookApi();
  // }, []);
  const activeBookToggler = () => {
    setActiveBook(!activeBook);
  };
  return (
    <div
      className={
        activeBook ? styles["book-wrapper__active"] : styles["book-wrapper"]
      }
    >
      <span onClick={() => activeBookToggler()} className={styles["lable"]}>
        {/* <h5 className={styles["lable__title"]}>Harry Potter</h5> */}
      </span>
      <span className={styles["back"]}></span>
      <span className={styles["top"]}></span>
      <span className={styles["left"]}></span>
      <span onClick={() => setOnEdit(!onEdit)} className={styles["bookmark"]}>
        <p className={styles["bookmark__text"]}>{onEdit ? "Finish" : "Edit"}</p>
      </span>
      <span className={styles["bookmark2"]}>
        {" "}
        <p className={styles["bookmark2__text"]}>Delete</p>
      </span>
      <span onClick={() => activeBookToggler()} className={styles["bookmark3"]}>
        <p className={styles["bookmark3__text"]}>Close</p>
      </span>
      <span className={styles["right"]}>
        <span className={styles["book-info"]}>
          {onEdit ? (
            <textarea
              className={styles["book-info__title-input"]}
              defaultValue={title || "Title"}
            />
          ) : (
            <h5 className={styles["book-info__title"]}>{title || "Title"}</h5>
          )}

          <p className={styles["book-info__author"]}>{author || "Author"}</p>
          <p className={styles["book-info__annotation"]}>
            {annotation || "Annotation"}
          </p>
        </span>
      </span>
    </div>
  );
};

export default Book;
