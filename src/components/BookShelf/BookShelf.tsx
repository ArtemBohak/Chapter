import {
  FC,
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
} from "react";
import Book from "./Book/Book";
import styles from "./BookShelf.module.scss";
import api from "@/src/axios/api";
import { EndpointsEnum } from "@/src/axios/endpoints.types";

const BookShelf: FC = () => {
  const [books, setbooks] = useState([]);

  type bookShelfState = {
    books: [];
    setbooks?: Dispatch<React.SetStateAction<[]>>;
  };
  type bookShelfContext = {
    children?: ReactNode;
  };
  const bookShelfContext = createContext<bookShelfContext>();

  useEffect(() => {
    api.get(EndpointsEnum.ME).then((res) => {
      console.log(res.data.userBooks);
      setbooks(res.data.userBooks);
    });
  }, []);
  console.log(books);
  return (
    <div className={styles["shelf-wrapper"]}>
      {[...new Array(10)].map((book, index) => (
        <Book
          // title={book.nameOfBook}
          // author={book.author}
          // annotation={book.annotation}
          key={index}
        />
      ))}
    </div>
  );
};

export default BookShelf;
