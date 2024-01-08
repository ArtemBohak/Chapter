import {
  Dispatch,
  MutableRefObject,
  ReactElement,
  SetStateAction,
} from "react";

export interface IPopUpMenuProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  nodeRef: MutableRefObject<null>;
  children: ReactElement;
  classNames?: string;
}
