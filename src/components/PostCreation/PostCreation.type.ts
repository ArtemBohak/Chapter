import { ModalProps } from "../Modal/Modal.type";

export type PostCreationProps = Pick<
  ModalProps,
  "portal" | "isOpen" | "setIsOpen"
>;
