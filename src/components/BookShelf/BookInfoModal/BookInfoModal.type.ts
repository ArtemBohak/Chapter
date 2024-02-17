import { Dispatch } from "react";

export type BookInfoModalProps = {
    nameOfBook: string | undefined;
    author: string;
    annotation: string;
    id: number;
    isOpen: boolean;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
    isFavorite: boolean;
    bookStatus?: number;
    imagePath: string;
    favoriteButtons?: boolean;
}