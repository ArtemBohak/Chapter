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
  const deleteIdList: number[] = [];
  useEffect(() => {
    return setBooks(userBooks);
  }, []);

  const fetchData = (id: string | number) => {
    console.log(id);
  };

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
        fetchData,
        deleteIdList,
      }}
    >
      {children}
    </BooksPageContext.Provider>
  );
};

export default BooksPageProvider;
