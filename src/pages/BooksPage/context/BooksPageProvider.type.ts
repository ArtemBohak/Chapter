import { IBook } from "@/src/components/BookShelf/Book/BookProps.type";
import { Dispatch, ReactNode } from "react";

export type BooksPageContextType = {
  edit: boolean;
  setEdit: Dispatch<React.SetStateAction<boolean>>;
  isCancelModalOpen: boolean;
  setIsCancelModalOpen: Dispatch<React.SetStateAction<boolean>>;
  isDeleteBookModalOpen: boolean;
  setIsDeleteBookModalOpen: Dispatch<React.SetStateAction<boolean>>;
  isAddBookModalOpen: boolean;
  setIsAddBookModalOpen: Dispatch<React.SetStateAction<boolean>>;
  books: Array<IBook> | [];
  fetchData: (id: string | number) => void;
  deleteIdList: number[];
    
};

export type BooksPageProviderProps = {
  children: ReactNode;
} & Partial<BooksPageContextType>;

export type editTumbler = boolean
