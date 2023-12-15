import { Icon, IconEnum } from "@/src/components";
import { FC, useState } from "react";
import styles from "../IconButtons.module.scss";
import {
  updateUser,
  updateUserFavoritBooks,
  useAppDispatch,
  useAppSelector,
} from "@/src/redux";
import { favoriteBooksApi } from "./FavoriteBooksApi";
import { FavoriteBookButtonProps } from "../IconButtons.type";

const FavoriteBookButton: FC<FavoriteBookButtonProps> = ({
  isFavorite,
  id,
  className,
}) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const { userBooks } = user;
  const [favorite, setFavorite] = useState(isFavorite);
  const dispatch = useAppDispatch();

  const handleClickFavorite = async () => {
    setFavorite(!favorite);
    const { data } = await favoriteBooksApi(id);
    console.log(data.favorite_book_status);
    const bookIndex = userBooks.findIndex((item) => item.id === data.id);
    if (bookIndex !== -1) {
      const updatedBook = {
        ...userBooks[bookIndex],

        favorite_book_status: favorite,
      };

      const updatedUserBooks = [
        ...userBooks.slice(0, bookIndex),
        updatedBook,
        ...userBooks.slice(bookIndex + 1),
      ];

      // dispatch(updateUserFavoritBooks(updatedUserBooks));
    } else {
      console.log("Book with ID", data.id, "not found in userBooks array.");
    }
  };

  return (
    <button
      onClick={handleClickFavorite}
      className={className || styles["favorite-button"]}
    >
      {favorite ? (
        <Icon icon={IconEnum.FavoriteBook} />
      ) : (
        <Icon icon={IconEnum.FavoriteBookActive} />
      )}
    </button>
  );
};

export default FavoriteBookButton;
