import { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import "./sliderStyles/slick-theme.scss";
import "./sliderStyles/slick.scss";
import "./sliderStyles/sliderStyles.scss";
import Book from "./Book/Book";
import { Link } from "react-router-dom";
import { links } from "@/src/types";
import { settings } from "./SliderSettings/SliderSettings";
import { useAppSelector } from "@/src/redux";
import { IBook } from "./Book/BookProps.type";
import AddBookSliderButton from "./AddBookSliderButton/AddBookSliderButton";
import { BooksPageProvider } from "@/src/pages/BooksPage/context";

const BookShelf: FC = () => {
  const { user } = useAppSelector((state) => state.userSlice);
  const { userBooks } = user;
  const [favoriteBooksList, setFavoriteBooksList] = useState<Array<IBook> | []>(
    []
  );
  const addBookArray: any[] = [1, 2, 3];

  useEffect(() => {
    const bookslist = userBooks.filter((item) => {
      return item.favorite_book_status === true;
    });
    setFavoriteBooksList(bookslist);
    addBookArray.length = 3 - favoriteBooksList.length;
    console.log("length", addBookArray.length);
  }, [userBooks]);

  return (
    <BooksPageProvider>
      <div className="flex flex-col h-full w-full">
        <div className="flex justify-between">
          <h6 className="favorite-books-title">Favorite books</h6>
          <Link className="text-[#6C6C6C]" to={links.USER_BOOKS}>
            see all
          </Link>
        </div>
        <Slider {...settings}>
          {favoriteBooksList.map((book, i) => (
            <Book
              bookStatus={book.book_statusId}
              key={i}
              id={book.id}
              isFavorite={book.favorite_book_status}
              nameOfBook={book.nameOfBook}
              author={book.author}
              annotation={book.annotation}
              bookNameLength={38}
            />
          ))}
          {addBookArray.map((_, i) => (
            <AddBookSliderButton key={i} />
          ))}
        </Slider>
      </div>
    </BooksPageProvider>
  );
};

export default BookShelf;
