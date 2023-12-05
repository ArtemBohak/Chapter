import { Dispatch } from "react";

export type CancelModalProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
    setEdit: Dispatch<React.SetStateAction<boolean>>;
}