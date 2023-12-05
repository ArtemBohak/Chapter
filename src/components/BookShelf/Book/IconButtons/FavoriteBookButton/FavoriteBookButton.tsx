import { Icon, IconEnum } from "@/src/components";
import { FC, useState } from "react";
import styles from "../IconsButtons.module.scss";
import { useAppSelector } from "@/src/redux";
import {
  favoriteBooksApiDelete,
  favoriteBooksApiPost,
} from "./FavoriteBooksApi";

type FavoriteBookButton = {
  isFavorite: boolean | undefined;
  id: number;
};

const FavoriteBookButton: FC<FavoriteBookButton> = ({ isFavorite, id }) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const [favorite, setFavorite] = useState(isFavorite);

  const handleClickFavorite = async () => {
    setFavorite(!favorite);

    if (favorite === false) {
      favoriteBooksApiPost(user.id, id);
    } else {
      favoriteBooksApiDelete(id);
    }
  };
  return (
    <button onClick={handleClickFavorite} className={styles["favorite-button"]}>
      {favorite ? (
        <Icon icon={IconEnum.FavoriteBook} />
      ) : (
        <Icon icon={IconEnum.FavoriteBookActive} />
      )}
    </button>
  );
};

export default FavoriteBookButton;
