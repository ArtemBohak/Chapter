import { Dispatch } from "react";

export type DeleteModalProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}