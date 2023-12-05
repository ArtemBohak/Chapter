import { FC } from "react";
import Slider from "react-slick";
import "./sliderStyles/slick-theme.scss";
import "./sliderStyles/slick.scss";
import "./sliderStyles/sliderStyles.scss";
import Book from "./Book/Book";
import { Link } from "react-router-dom";
import { links } from "@/src/types";
import { settings } from "./SliderSettings/SliderSettings";

const BookShelf: FC = () => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex justify-between">
        <h6 className="favorite-books-title">Favorite books</h6>
        <Link className="text-[#6C6C6C]" to={links.USER_BOOKS}>
          see all
        </Link>
      </div>
      <Slider {...settings}>
        {[...new Array(7)].map((_, i) => (
          <Book key={i} id={0} isFavorite={false} />
        ))}
      </Slider>
    </div>
  );
};

export default BookShelf;
