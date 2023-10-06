import { FC, useContext, useEffect, useState } from "react";
import styles from "../BookShelf.module.scss";
import Bookmarks from "./Bookmarks/Bookmarks";
import BookDescription from "./BookDescription/BookDescription";
import BookEditForm from "./BookEditForm/BookEditForm";

const Book: FC<IBook> = (title) => {
  const [activeBook, setActiveBook] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  console.log(title);
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
      id="book-wrapper"
      className={
        activeBook ? styles["book-wrapper__active"] : styles["book-wrapper"]
      }
    >
      <span onClick={() => activeBookToggler()} className={styles["lable"]}>
        <h5 className={styles["lable__title"]}>Harry Potter</h5>
      </span>
      <span className={styles["back"]}></span>
      <span className={styles["top"]}></span>
      <span className={styles["left"]}></span>
      <Bookmarks
        activeBookToggler={activeBookToggler}
        onEdit={onEdit}
        setOnEdit={setOnEdit}
      />
      <span className={styles["right"]}>
        <div className={styles["book-info"]}>
          {onEdit ? <BookEditForm /> : <BookDescription />}
        </div>
      </span>
    </div>
  );
};

export default Book;
