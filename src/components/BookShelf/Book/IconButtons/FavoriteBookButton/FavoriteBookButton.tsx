import { Icon, IconEnum } from "@/src/components";
import { FC, useState } from "react";
import styles from "../IconButtons.module.scss";
import { fetchFavoriteBookStatus, useAppDispatch } from "@/src/redux";
import { FavoriteBookButtonProps } from "../IconButtons.type";
import { useBooksPageContext } from "@/src/pages/BooksPage/context";

const FavoriteBookButton: FC<FavoriteBookButtonProps> = ({
  isFavorite,
  id,
  className,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const dispatch = useAppDispatch();
  const { favoriteCount } = useBooksPageContext();

  const handleClickFavorite = async () => {
    setFavorite(!favorite);
    dispatch(fetchFavoriteBookStatus(id));
  };

  return (
    <>
      {favorite ? (
        <button
          onClick={handleClickFavorite}
          className={className || styles["favorite-button"]}
        >
          <Icon icon={IconEnum.FavoriteBook} />
        </button>
      ) : (
        favoriteCount.length < 7 && (
          <button
            onClick={handleClickFavorite}
            className={className || styles["favorite-button"]}
          >
            <Icon icon={IconEnum.FavoriteBookActive} />
          </button>
        )
      )}
    </>
  );
};

export default FavoriteBookButton;
