import { Dispatch } from "react";

export type EditBookModalProps = {
    bookId: number;
    isOpen: boolean;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}