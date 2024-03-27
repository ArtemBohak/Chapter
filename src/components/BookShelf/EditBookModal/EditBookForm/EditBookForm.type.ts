import { Dispatch } from "react";
import { IBook } from "../../Book/BookProps.type";

export type editBookProps = {
    bookId?: number,
    book_statusId: number,
    nameOfBook: string,
    author: string,
    annotation: string,
    imagePath: string,
    favorite_book_status: boolean;
}

export type EditBookFormProps = {
    currentBook: IBook | undefined;
    bookId: number,
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}