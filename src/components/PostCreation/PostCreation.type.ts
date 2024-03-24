import { ModalProps } from "../Modal/Modal.type";

export type PostCreationProps = {
  isScreenSize?: boolean;
  prevImgUrl?: string;
} & Pick<ModalProps, "portal" | "isOpen" | "setIsOpen"> &
  Partial<ModalProps>;
