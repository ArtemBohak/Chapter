import { Dispatch } from "react";

export type AddBookModalProps = {
    isOpen: boolean ;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}