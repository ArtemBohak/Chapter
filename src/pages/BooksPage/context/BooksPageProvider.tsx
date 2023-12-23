import { FC, useEffect, useState } from "react";
import { BooksPageContext } from "./hooks/useBooksPageContext";
import { BooksPageProviderProps } from "./BooksPageProvider.type";
import { useAppSelector } from "@/src/redux";
import { IBook } from "@/src/components/BookShelf/Book/BookProps.type";

const BooksPageProvider: FC<BooksPageProviderProps> = ({ children }) => {
  const { user } = useAppSelector((state) => state.userSlice);
  const { userBooks } = user;

  const [books, setBooks] = useState<IBook[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
  const [isDeleteBookModalOpen, setIsDeleteBookModalOpen] =
    useState<boolean>(false);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState<boolean>(false);
  const [deleteIdList, setDeleteIdList] = useState<number[]>([]);
  const [favoriteCount, setFavoriteCount] = useState<[] | IBook[]>([]);

  useEffect(() => {
    setBooks(userBooks);
    setFavoriteCount(
      userBooks.filter((item) => item.favorite_book_status === true)
    );
  }, [userBooks]);

  return (
    <BooksPageContext.Provider
      value={{
        edit,
        setEdit,
        isCancelModalOpen,
        setIsCancelModalOpen,
        isDeleteBookModalOpen,
        setIsDeleteBookModalOpen,
        isAddBookModalOpen,
        setIsAddBookModalOpen,
        books,
        deleteIdList,
        setDeleteIdList,
        favoriteCount,
        setFavoriteCount,
      }}
    >
      {children}
    </BooksPageContext.Provider>
  );
};

export default BooksPageProvider;
