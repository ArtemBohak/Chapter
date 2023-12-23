import { Dispatch } from "react";

export type DeleteModalProps = {
    id: number;
    isOpen: boolean;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}