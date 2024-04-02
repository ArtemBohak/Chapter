import { Dispatch } from "react";

export type DeleteModalProps = {
  id: number;
  isOpen: boolean;
  imgUrl: string;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
};
