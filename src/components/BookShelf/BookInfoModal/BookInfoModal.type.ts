import { Dispatch } from "react";

export type BookInfoModalProps = {
    id: number;
    isOpen: boolean;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}