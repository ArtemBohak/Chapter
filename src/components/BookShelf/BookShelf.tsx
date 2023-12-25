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
  const [addBookArray, setAddBookArray] = useState<number[]>([]);
  const responsive = [
    {
      breakpoint: 1680,
      settings: {
        slidesToShow: favoriteBooksList.length,
        slidesToScroll: favoriteBooksList.length,
        initialSlide: 0,
        swipe: favoriteBooksList.length < 3 && false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow:
          favoriteBooksList.length < 3 ? favoriteBooksList.length : 5,
        slidesToScroll: favoriteBooksList.length < 3 ? 0 : 5,
        initialSlide: 0,
        swipe: favoriteBooksList.length < 3 && false,
      },
    },
    {
      breakpoint: 374,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        swipe: favoriteBooksList.length < 3 && false,
      },
    },
  ];

  const setAddBook = () => {
    const bookslist = userBooks.filter((item) => {
      return item.favorite_book_status === true;
    });
    const ListLength = bookslist.length;
    if (ListLength === 0) {
      setAddBookArray([1, 2, 3]);
    } else if (ListLength === 1) {
      setAddBookArray([1, 2]);
    }
    if (ListLength > 1) {
      setAddBookArray([1]);
    }
  };

  useEffect(() => {
    const bookslist = userBooks.filter((item) => {
      return item.favorite_book_status === true;
    });
    setFavoriteBooksList(bookslist);
  }, [userBooks]);

  useEffect(() => {
    setAddBook();
  }, []);

  return (
    <BooksPageProvider>
      <div className="flex flex-col h-full w-full">
        <div className="flex justify-between">
          <h6 className="favorite-books-title">Favorite books</h6>
          <Link className="text-[#6C6C6C]" to={links.USER_BOOKS}>
            see all
          </Link>
        </div>
        <Slider responsive={responsive} {...settings}>
          {favoriteBooksList.map((book, i) => (
            <Book
              bookImageUrl={book.imagePath}
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
