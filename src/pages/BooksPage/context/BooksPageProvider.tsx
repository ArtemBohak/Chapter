import { FC, useState } from "react";
import { BooksPageContext } from "./hooks/useBooksPageContext";
import { BooksPageProviderProps, editTumbler } from "./BooksPageProvider.type";

const BooksPageProvider: FC<BooksPageProviderProps> = ({ children }) => {
  const [edit, setEdit] = useState<editTumbler>(false);
  const [isModalOpen, setIsModalOpen] = useState<editTumbler>(false);

  console.log(isModalOpen);

  return (
    <BooksPageContext.Provider
      value={{ edit, setEdit, isModalOpen, setIsModalOpen }}
    >
      {children}
    </BooksPageContext.Provider>
  );
};

export default BooksPageProvider;
