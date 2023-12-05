import { ModalProps } from "../Modal/Modal.type";

export type PostCreationProps = {
  isScreenSize?: boolean;
} & Pick<ModalProps, "portal" | "isOpen" | "setIsOpen"> &
  Partial<ModalProps>;
