import { createContext, useContext } from "react";
import { BooksPageContextType } from "../BooksPageProvider.type";

export const defaultValues: BooksPageContextType = {
  isCancelModalOpen: false,
  setIsCancelModalOpen: () => {},
  edit: false,
  setEdit: () => {},
  isDeleteBookModalOpen: false,
  setIsDeleteBookModalOpen: () => {},
  books: [],
  fetchData: () => {}
};

export const BooksPageContext = createContext<BooksPageContextType>(defaultValues);

export const useBooksPageContext = () => {
  const booksPageContext = useContext(BooksPageContext);

  if (!BooksPageContext)
    throw new Error(
      "useFeedContext has to be used within <FeedContext.Provider>"
    );
  return booksPageContext;
};




