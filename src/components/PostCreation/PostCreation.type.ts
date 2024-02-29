import { ModalProps } from "../Modal/Modal.type";

export type PostCreationProps = {
  isScreenSize?: boolean;
  prevImgUrl?: string | null;
} & Pick<ModalProps, "portal" | "isOpen" | "setIsOpen"> &
  Partial<ModalProps>;
