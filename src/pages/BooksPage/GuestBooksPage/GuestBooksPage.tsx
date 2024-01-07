import { FC } from "react";
import BooksPageHeader from "../Components/BooksPageHeader/BooksPageHeader";

const GuestBooksPage: FC = () => {
  return (
    <div className="flex-col pt-[120px]">
      <BooksPageHeader user="guest" />
    </div>
  );
};

export default GuestBooksPage;
