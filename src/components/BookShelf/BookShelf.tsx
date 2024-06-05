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
import { BookShelfProps } from "./BookShelf.type";
import { useGetScreenSize } from "@/src/hooks";

const BookShelf: FC<BookShelfProps> = ({ enemyData, Id }) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const { userBooks } = user;
  const [favoriteBooksList, setFavoriteBooksList] = useState<Array<IBook> | []>(
    []
  );
  const [addBookArray, setAddBookArray] = useState<number[]>([]);
  // const [booksLength, setBooksLength] = useState(2)

  const [screenSize] = useGetScreenSize()

  const responsive = [
    {
      breakpoint: 2500,
      settings: {
        slidesToShow:
          favoriteBooksList.length < 3
            ? (!Id && addBookArray.length != 0)
              ? favoriteBooksList.length + 1
              : favoriteBooksList.length
            : 3,
        slidesToScroll: 3,
        initialSlide: 1,
        swipe: true,
        Infinity,
      },
    },
    {
      breakpoint: 1921,
      settings: {
        slidesToShow:
          favoriteBooksList.length < 3
            ? (!Id && addBookArray.length != 0)
              ? favoriteBooksList.length + 1
              : favoriteBooksList.length
            : 3,
        slidesToScroll: 3,
        initialSlide: 1,
        swipe: true,
        Infinity,
      },
    },
    {
      breakpoint: 1680,
      settings: {
        slidesToShow:
          favoriteBooksList.length < 3
            ? (!Id && addBookArray.length != 0)
              ? favoriteBooksList.length + 1
              : favoriteBooksList.length
            : favoriteBooksList.length,
        slidesToScroll: 3,
        initialSlide: 1,
        swipe: true,
        Infinity,
        variableWidth: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow:
          favoriteBooksList.length < 5
            ? (!Id && addBookArray.length != 0)
              ? favoriteBooksList.length + 1
              : favoriteBooksList.length
            : 5,
        slidesToScroll: 5,
        initialSlide: 1,
        swipe: true,
        Infinity,
        variableWidth: false,
      },
    },
    {
      breakpoint: 374,
      settings: {
        slidesToShow:
          favoriteBooksList.length < 3
            ? (!Id && addBookArray.length != 0)
              ? favoriteBooksList.length + 1
              : favoriteBooksList.length
            : 3,
        slidesToScroll: 3,
        initialSlide: 1,
        swipe: true,
        Infinity,
        variableWidth: true,
      },
    },
  ];

  const setAddBook = () => {
    const bookslist = userBooks.filter((item) => {
      return item.favorite_book_status === true;
    });
    const ListLength = bookslist.length;
    if (ListLength === 0) {
      setAddBookArray([1]);
    } else if (ListLength === 1) {
      setAddBookArray([1]);
    }
    if (ListLength > 1) {
      setAddBookArray([1]);
    }
    if (ListLength > 2) {
      setAddBookArray([]);
    }
  };

  useEffect(() => {
    if (!Id) {
      const bookslist = userBooks.filter((item) => {
        return item.favorite_book_status === true;
      });
      setFavoriteBooksList(bookslist);
    }
    if (enemyData) {
      const bookslist = enemyData.userBooks.filter((item) => {
        return item.favorite_book_status === true;
      });
      setFavoriteBooksList(bookslist);
    }
  }, [userBooks]);

  useEffect(() => {
    setAddBook();
  }, [favoriteBooksList]);

  return (
    <BooksPageProvider>
      <div className="flex flex-col h-full w-full">
        <div className="flex justify-between px-1">
          <h6 className="favorite-books-title">Favorite books</h6>
          <Link
            className="text-[#6C6C6C]"
            to={enemyData ? `/${Id}/books` : links.USER_BOOKS}
          >
            see all
          </Link>
        </div>
        <Slider responsive={responsive} {...settings}>
          {favoriteBooksList.map((book) => (
            <Book
              bookImageUrl={book.imagePath}
              bookStatus={book.book_statusId}
              key={book.id}
              id={book.id}
              isFavorite={book.favorite_book_status}
              nameOfBook={book.nameOfBook}
              author={book.author}
              annotation={book.annotation}
              bookNameLength={screenSize > 1680 ? 20 : 10}
            />
          ))}
          {!Id &&
            addBookArray.map((_, i) => (
              <Link to={"/books"} key={i}>
                <AddBookSliderButton />
              </Link>
            ))}
        </Slider>
      </div>
    </BooksPageProvider>
  );
};

export default BookShelf;
