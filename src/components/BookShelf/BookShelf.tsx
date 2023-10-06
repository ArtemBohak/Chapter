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
import {
  BookShelfProvider,
  useBookShelfContext,
} from "@/src/context/BookShelf";
import cn from "classnames";
const BookShelf: FC = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    api.get(EndpointsEnum.ME).then((res) => {
      setBooks(res.data.userBooks);
    });

    console.log(books);
  }, []);

  return (
    <div className="flex flex-col justify-center bg-slate-500 max-w-[500px] mx-auto text-white">
      <h3 className="mx-auto my-0">Title</h3>
      <div className={styles["shelf-wrapper"]}>
        <BookShelfProvider>
          {[...new Array(10)].map((book, index) => (
            <Book
              // title={book.nameOfBook}
              // author={book.author}
              // annotation={book.annotation}
              key={index}
              title={book?.nameOfBook}
              author={""}
              annotation={""}
            />
          ))}
        </BookShelfProvider>
      </div>
    </div>
  );
};

export default BookShelf;
