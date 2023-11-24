import { Dispatch, ReactNode } from "react";

export type BooksPageContextType = {
  edit: boolean;
  setEdit: Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>;
    
};

export type BooksPageProviderProps = {
  children: ReactNode;
} & Partial<BooksPageContextType>;

export type editTumbler = boolean
